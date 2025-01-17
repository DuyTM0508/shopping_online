import { ORDER_BY } from "@/consts/common";
import { ProductList } from "@/services/modules/product/interfaces/product";
import { Form, Formik } from "formik";
import FormikField from "../customFieldsFormik/FormikField";
import InputField from "../customFieldsFormik/InputField";
import SelectField from "../customFieldsFormik/SelectField";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export interface IValueFormPageHeader {
  SortColumn?: string;
  SortDirection?: string;
  TextSearch?: string;
  MinPrice?: string;
  MaxPrice?: string;
  Category?: string;
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
  optionCategory?: {
    label: string;
    value: string;
  }[];
}

const PageListHeader = (props: IPropsPageListLayout) => {
  const {
    initValue,
    optionsSortBy,
    onClickSearch,
    setFilters,
    optionCategory,
  } = props;

  return (
    <div className="w-full py-3">
      <Formik
        initialValues={{
          SortColumn: initValue?.SortColumn || "",
          SortDirection: initValue?.SortDirection || "",
          MinPrice: initValue?.MinPrice || "",
          MaxPrice: initValue?.MaxPrice || "",
          Category: initValue?.Category || "",
        }}
        enableReinitialize
        onSubmit={(values) => {
          try {
            setFilters?.((prevFilters: any) => ({
              ...prevFilters,
              ...values,
            }));
            onClickSearch?.(values);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="flex flex-wrap items-center gap-6">
              {/* Price Filter */}
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Price:</Label>
                <div className="flex items-center gap-2">
                  <FormikField
                    component={InputField}
                    name="MinPrice"
                    placeholder="Min Price"
                    className="w-[140px]"
                    isNumberic
                    unitNumberic="VND"
                    defaultValue={undefined}
                  />
                  <FormikField
                    component={InputField}
                    name="MaxPrice"
                    placeholder="Max Price"
                    className="w-[140px]"
                    isNumberic
                    unitNumberic="VND"
                    defaultValue={undefined}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <Label className="text-sm font-medium">Category:</Label>
                <FormikField
                  component={SelectField}
                  name="Category"
                  options={optionCategory || []}
                  placeholder="Select category"
                  shouldHideSearch
                />
              </div>

              {/* Sort Options */}
              <div className="ml-auto flex items-center gap-3">
                <FormikField
                  component={SelectField}
                  name="SortColumn"
                  options={optionsSortBy || []}
                  placeholder="Sort by"
                  shouldHideSearch
                  afterOnChange={(value) => {
                    if (!value) return;
                    setFieldValue("SortDirection", ORDER_BY.ASC);
                  }}
                />

                <FormikField
                  component={SelectField}
                  name="SortDirection"
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
                  placeholder="Order by"
                  shouldHideSearch
                />

                <Button
                  type="submit"
                  className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                >
                  Filter
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PageListHeader;
