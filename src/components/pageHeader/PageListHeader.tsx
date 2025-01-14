import { ORDER_BY } from "@/consts/common";
import { ProductList } from "@/services/modules/product/interfaces/product";
import { Form, Formik } from "formik";
import CommonIcons from "../commonIcons";
import FormikField from "../customFieldsFormik/FormikField";
import SelectField from "../customFieldsFormik/SelectField";
import { Button } from "../ui/button";
import { showError } from "@/helpers/toast";

export interface IValueFormPageHeader {
  SortColumn?: string;
  SortDirection?: string;
  TextSearch?: string;
}
interface IPropsPageListLayout {
  pageName?: string;
  placeholderSearch?: string;
  onClickAdd?: () => void;
  initValue?: IValueFormPageHeader;
  searchClass?: string;
  optionsSortBy?: {
    label: string;
    value: string;
  }[];
  dataProduct?: ProductList[];
  setFilters: (values: any) => void;
  onClickSearch: (value: IValueFormPageHeader) => void;
}

const PageListHeader = (props: IPropsPageListLayout) => {
  const { initValue, optionsSortBy, onClickSearch } = props;

  return (
    <div className="component:PageListHeader mt-2 pb-2">
      <Formik
        initialValues={{
          SortColumn: initValue?.SortColumn || "",
          SortDirection: initValue?.SortDirection || "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          try {
            // setFilters((prevFilters: any) => ({
            //   ...prevFilters,
            //   SortColumn: values.SortColumn,
            //   SortDirection: values.SortDirection,
            // }));
            onClickSearch?.(values);
          } catch (error) {
            showError(error);
          }
        }}
      >
        {({ setFieldValue }) => {
          return (
            <Form>
              <div className="flex flex-col justify-between gap-5 border-b pb-3 sm:flex-col sm:items-start sm:justify-start sm:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:gap-3">
                <div className="flex items-center gap-7">
                  <div>Filter:</div>
                  <div>Avaiability</div>
                  <div>Price</div>
                </div>

                <div className="flex items-center gap-7">
                  <FormikField
                    component={SelectField}
                    name="SortColumn"
                    icon={
                      <CommonIcons.ChevronDown
                        className="ml-2 shrink-0 text-main-primary 2xl:h-auto 2xl:w-[15.6px]"
                        size={36}
                      />
                    }
                    shouldHideSearch
                    // hideIconCheck
                    placeholder={"Sort by"}
                    className={"text-text-secondary"}
                    options={optionsSortBy || []}
                    afterOnChange={(selectedOption: any) => {
                      if (!selectedOption) {
                        setFieldValue("SortDirection", undefined);
                      }
                      setFieldValue("SortDirection", ORDER_BY?.ASC);
                    }}
                  />

                  <FormikField
                    component={SelectField}
                    name="SortDirection"
                    icon={
                      <CommonIcons.ChevronDown
                        className="ml-2 shrink-0 text-main-primary 2xl:h-auto 2xl:w-[15.6px]"
                        size={36}
                      />
                    }
                    placeholder={"Order by"}
                    className={"text-text-secondary"}
                    shouldHideSearch
                    options={[
                      {
                        label: "Increasing",
                        value: ORDER_BY.ASC,
                      },
                      {
                        label: "Decreasing",
                        value: ORDER_BY.DESC,
                      },
                    ]}
                  />

                  <Button
                    className="w-full min-w-0 bg-main-primary bg-opacity-10 text-main-primary 2xl:h-[36px]"
                    type={"submit"}
                    variant={"secondary"}
                  >
                    Sort
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PageListHeader;
