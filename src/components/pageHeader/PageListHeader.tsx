import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import { Form, Formik } from "formik";
import { useMemo } from "react";
import CommonIcons from "../commonIcons";

export interface IValueFormPageHeader {
  search?: string;
  sortBy?: string;
}
interface IPropsPageListLayout {
  pageName?: string;
  placeholderSearch?: string;
  onClickSearch: (value: IValueFormPageHeader) => void;
  onClickAdd?: () => void;
  initValue?: IValueFormPageHeader;
  searchClass?: string;
  optionsSortBy?: {
    label: string;
    value: string;
    type?: "id" | "other";
  }[];
}

const PageListHeader = (props: IPropsPageListLayout) => {
  const { pageName, placeholderSearch, onClickSearch, searchClass, initValue } =
    props;

  const initValueFormik = useMemo(() => {
    return {
      search: initValue?.search || "",
      sortBy: initValue?.sortBy || "",
    };
  }, [initValue]);

  return (
    <div className="component:PageListHeader mt-2 pb-2">
      <Formik
        initialValues={initValueFormik}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            onClickSearch?.(values);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({}) => {
          return (
            <Form className="flex items-center justify-between gap-12">
              <div
                className={
                  "typo-7 2xl:text-typo-5 text-nowrap font-bold text-text-four"
                }
              >
                {pageName}
              </div>
              <div className={`flex flex-grow ${searchClass} gap-6`}>
                <div className="grid w-full grid-cols-6 gap-6">
                  <div className="col-span-6 mr-[33px] 2xl:flex">
                    <FormikField
                      component={InputField}
                      name="search"
                      placeholder={placeholderSearch}
                      className={"text-text-secondary 2xl:h-9"}
                      extraLeft={
                        <CommonIcons.Search
                          // onClick={() => onClickSearch(values)}
                          className="font-light text-icon-search 2xl:h-4 2xl:w-4"
                        />
                      }
                    />
                  </div>
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
