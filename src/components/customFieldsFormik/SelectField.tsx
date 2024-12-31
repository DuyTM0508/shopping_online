import { isDefine } from "@/helpers/common";
import { AdditionalFormikProps, SelectOption } from "@/interfaces/common";
import { cn } from "@/lib/utils";
import { get, isEmpty, isString, toString } from "lodash";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CommonIcons from "../commonIcons";
import ScrollWrapper from "../ScrollWrapper";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Label } from "../ui/label";
import Loading from "../ui/loading";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface SelectFieldProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  placeholderSearch?: string;
  messageItemNotFound?: string;
  options: SelectOption[];
  disabled?: boolean;
  afterOnChange?: (e?: SelectOption | SelectOption[]) => void;
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onSearchAPI?: (value: any) => void;
  handleLoadMore?: () => void;
  currentPage?: number;
  onToggle?: (open: boolean) => void;
  className?: string;
  defaultValue?: string;
  shouldHideSearch?: boolean;
  hideIconCheck?: boolean;
  icon?: React.ReactNode;
  onKeyDown?: (e: any) => void;
  multiple?: boolean;
  onSelect?: (
    option: any,
    valueOption?: SelectOption[],
    deleteItem?: any
  ) => void;
}

const SelectField = (props: SelectFieldProps & AdditionalFormikProps) => {
  //! State
  const {
    options,
    classNameContainer,
    field,
    form,
    label,
    classNameLabel,
    placeholder,
    placeholderSearch,
    messageItemNotFound,
    required,
    disabled,
    afterOnChange,
    loading,
    loadingMore,
    hasMore,
    handleLoadMore,
    onSearchAPI,
    onToggle,
    className,
    defaultValue,
    shouldHideSearch = false,
    hideIconCheck = false,
    icon,
    multiple,
    onSelect,
  } = props;

  const [open, setOpen] = useState(false);
  const [prevOpen, setPrevOpen] = useState(false);

  const { value, name } = field;
  const { setFieldValue, setFieldTouched, errors, touched, values } = form;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const msgError =
    get(touched, name) && !value && (get(errors, name) as string);

  //! Function

  //* Handle click outside - close popover - for some reasons: onblur popover not working
  //* 1.1 open = true | prevOpen = false;
  //* 2.1 open = false | prevOpen = true;
  if (prevOpen !== open) {
    setPrevOpen(open);
    //* 1.2 open = true | prevOpen = true;
    //* 2.2 open = false | prevOpen = false;

    if (!open) {
      setFieldTouched(name, true);
    }
  }

  //! Render
  const widthPopover = buttonRef.current?.getBoundingClientRect().width || 0;

  const renderValue = () => {
    if (isDefine(value)) {
      if (multiple) {
        const optionValue = values[name] || [];
        return (
          <div className="flex flex-wrap gap-2">
            {optionValue.map((el: SelectOption) => {
              return (
                <Badge
                  key={el.value}
                  className="h-[40px] !rounded-[4px] bg-bg-bgBagde font-normal text-text-six hover:bg-bg-bgBagde"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex content-between items-center gap-2">
                    <div className="typo-3">{el?.label}</div>
                    <CommonIcons.XIcon
                      size={20}
                      onClick={() => {
                        const currentValue = [...value];
                        const newValue = currentValue.filter(
                          (item) => item.value !== el.value
                        );
                        onSelect
                          ? onSelect(el, newValue, el)
                          : setFieldValue(name, newValue);
                      }}
                    />
                  </div>
                </Badge>
              );
            })}
          </div>
        );
      }
      const valueResult = options.find(
        (option) => `${option.value}` === `${value}`
      );
      return valueResult ? valueResult?.label : defaultValue;
    } else {
      if (defaultValue) {
        return defaultValue;
      } else {
        return <div className="typo-3 2xl:text-typo-2">{placeholder}</div>;
      }
    }
  };

  return (
    <div className={twMerge("grid w-full gap-1.5", classNameContainer)}>
      {label && (
        <Label
          className={twMerge(
            "typo-7 mb-1 block font-medium text-black",
            required && "required",
            classNameLabel
          )}
        >
          {label}
        </Label>
      )}
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          onToggle?.(open);
        }}
      >
        <PopoverTrigger disabled={disabled} className="w-full">
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={twMerge(
              "flex w-full justify-between 2xl:h-[36px]",
              multiple ? "h-fit min-h-[55px]" : "",
              !value && "text-muted-foreground",
              disabled && "bg-disabled",
              msgError && "border-red-500",
              value && !disabled && "text-black"
            )}
          >
            <div
              className={twMerge(
                "grow text-left font-normal",
                !value && "!text-muted-foreground",
                multiple && isEmpty(value)
                  ? "!text-muted-foreground"
                  : "truncate",
                className
              )}
            >
              {renderValue()}
            </div>
            {icon ? (
              icon
            ) : (
              <CommonIcons.ChevronDown className="ml-2 h-6 w-6 shrink-0" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          style={{
            width: widthPopover,
            position: "relative",
          }}
        >
          <Command shouldFilter={onSearchAPI ? false : true}>
            {!shouldHideSearch && (
              <CommandInput
                style={{ letterSpacing: "2px" }}
                onValueChange={onSearchAPI ? onSearchAPI : undefined}
                placeholder={placeholderSearch || "Search..."}
              />
            )}
            <div className={"relative"}>
              {isEmpty(options) && (
                <div className="flex justify-center">
                  {messageItemNotFound || "No item found."}
                </div>
              )}

              <CommandGroup className={"max-h-[200px] overflow-auto"}>
                <ScrollWrapper
                  key={`${loading}`}
                  onScrollEnd={() => {
                    if (hasMore && !loading && !loadingMore) {
                      handleLoadMore?.();
                    }
                  }}
                >
                  {options.map((option) => {
                    if (option.isHide) return null;
                    const isChecked = multiple
                      ? !!(value || [])?.find(
                          (el: any) => el.value === option.value
                        )
                      : value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={toString(option.value)}
                        onSelect={async () => {
                          if (multiple) {
                            const currentValue: SelectOption[] = isEmpty(value)
                              ? []
                              : value;

                            const newValue = currentValue.find(
                              (el) => el.value === option.value
                            )
                              ? currentValue.filter(
                                  (el) => el.value !== option.value
                                )
                              : [...currentValue, option];

                            onSelect
                              ? onSelect(option, newValue)
                              : await setFieldValue(name, newValue);

                            afterOnChange &&
                              !onSelect &&
                              afterOnChange(newValue);
                            setOpen(false);
                            return;
                          }

                          const result =
                            `${value}` === `${option.value}`
                              ? ""
                              : option.value;
                          await setFieldValue(name, result);
                          afterOnChange &&
                            afterOnChange(result ? option : undefined);
                          setOpen(false);
                        }}
                      >
                        {!hideIconCheck && (
                          <CommonIcons.Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isChecked ? "opacity-100" : "opacity-0"
                            )}
                          />
                        )}
                        <div className="flex flex-col gap-1 tracking-[2px]">
                          <div
                            className={
                              option?.subLabel ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.label}
                          </div>
                          <div className={"font-light"}>{option?.subLabel}</div>
                        </div>
                      </CommandItem>
                    );
                  })}
                </ScrollWrapper>
              </CommandGroup>
              {(loading || loadingMore) && (
                <div
                  className={
                    "absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm"
                  }
                >
                  <Loading />
                </div>
              )}
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {isString(msgError) && (
        <span className="invalid-text typo-3">{msgError}</span>
      )}
    </div>
  );
};

export default SelectField;
