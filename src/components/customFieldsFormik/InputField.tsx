import { AdditionalFormikProps } from "@/interfaces/common";
import { useFormikContext } from "formik";
import { get, isString } from "lodash";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import CommonIcons from "../commonIcons";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { NumericFormat } from "react-number-format";

interface InputFieldProps extends InputProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (e: ChangeEvent) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
  extraRight?: React.ReactNode;
  extraLeft?: React.ReactNode;
  isIcon?: boolean;
  iconText?: string;
  propValue?: number;
  onCustomChange?: (e: ChangeEvent) => void;
  isNumberic?: boolean;
  unitNumberic?: string;
  placeholder?: string;
}

const InputField = (props: InputFieldProps & AdditionalFormikProps) => {
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    className,
    required,
    type = "text",
    extraRight: extraRightElm,
    extraLeft,
    disabled,
    isIcon,
    onCustomChange,
    iconText,
    propValue = "",
    isNumberic,
    unitNumberic,
    placeholder,
    ...restPropsInput
  } = props;

  const { name, onBlur, onChange, value } = field;
  const { errors, touched, setTouched } = form;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const { setFieldValue } = useFormikContext();

  const msgError = get(touched, name) && (get(errors, name) as string);

  useEffect(() => {
    if (propValue !== "") {
      setFieldValue(name, propValue);
    }
  }, [propValue, setFieldValue, name]);

  useEffect(() => {
    if (value !== 0 && value !== "") {
      setTouched({ [name]: true });
    }
  }, [value, name, setTouched]);

  const onHandleChange = (e: ChangeEvent) => {
    if (onCustomChange) {
      onCustomChange(e);
    } else {
      onChange(e);
    }
    props?.afterOnChange && props?.afterOnChange(e);
  };

  const onCheckType = useCallback(() => {
    return showPassword ? "text" : type || "password";
  }, [showPassword, type]);

  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((prev: boolean) => !prev);
  }, [setShowPassword]);

  const extraRight = useCallback(() => {
    if (type !== "password") return extraRightElm;
    if (showPassword) {
      return <CommonIcons.EyeOff onClick={handleClickShowPassword} />;
    }
    return <CommonIcons.Eye onClick={handleClickShowPassword} />;
  }, [handleClickShowPassword, showPassword, type, extraRightElm]);

  const renderInput = () => {
    if (isNumberic) {
      return (
        <NumericFormat
          onBlur={onBlur}
          placeholder={placeholder}
          value={value}
          onValueChange={(values) => {
            onChange &&
              name &&
              onChange({
                target: {
                  name: name,
                  value: values.value || "",
                },
              });
          }}
          thousandSeparator=","
          decimalSeparator="."
          valueIsNumericString
          suffix={unitNumberic}
          disabled={disabled}
          onKeyPress={(e: any) => {
            const char = String.fromCharCode(e.which || e.keyCode);
            if (!/[0-9.,]/.test(char)) {
              e.preventDefault();
            }
          }}
          className={twMerge(
            className,
            "typo-3 !focus:border-black 2xl:text-typo-2 w-full rounded-[8px] !border-[1px] !border-[#e2e8f0] px-[16px] py-[8px] !text-black placeholder-text-third focus-visible:ring-0 focus-visible:ring-offset-0 2xl:h-9 2xl:py-[12px]",
            disabled && "bg-disabled !opacity-[0.8]",
            msgError && "border-red-500 focus:border-red-500"
          )}
        />
      );
    }
    return (
      <Input
        isIcon={isIcon}
        name={name}
        onBlur={onBlur}
        onChange={onHandleChange}
        value={value}
        id={name}
        type={onCheckType()}
        extraRight={extraRight()}
        extraLeft={extraLeft}
        disabled={disabled}
        onFocus={(e) => {
          if (type === "number") {
            return e.target.addEventListener(
              "wheel",
              function (e) {
                e.preventDefault();
              },
              { passive: false }
            );
          }
        }}
        placeholder={placeholder}
        iconText={iconText}
        className={twMerge(
          className,
          "typo-3 2xl:text-typo-2 rounded-[8px]  px-[16px] py-[8px] !text-black placeholder-text-third focus:border-black focus-visible:ring-0 focus-visible:ring-offset-0 2xl:h-9 2xl:py-[12px]",
          disabled && "bg-disabled !opacity-[0.8]",
          msgError && "border-red-500 focus:border-red-500"
        )}
        {...restPropsInput}
      />
    );
  };

  return (
    <div
      className={twMerge(
        "grid w-full items-center gap-1.5",
        classNameContainer
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className={twMerge(
            "typo-7 mb-1 font-medium text-black ",
            required && "required",
            classNameLabel
          )}
        >
          {label}
        </Label>
      )}
      <div>{renderInput()}</div>
      {isString(msgError) && (
        <span className="invalid-text typo-3">{msgError}</span>
      )}
    </div>
  );
};

export default InputField;
