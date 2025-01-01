import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetListProduct from "@/services/modules/product/hooks/useGetListProduct";
import { InitialFilterProduct } from "@/services/modules/product/interfaces/product";
import { Formik } from "formik";
import { useMemo } from "react";
import CommonIcons from "../commonIcons";
import CheckBoxField from "../customFieldsFormik/CheckBoxField";
import FormikField from "../customFieldsFormik/FormikField";
import InputField from "../customFieldsFormik/InputField";
import SelectField from "../customFieldsFormik/SelectField";
import CardProduct from "./cardProduct";
import PageWrapper from "../PageWrapper/PageWrapper";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

const CategoryFilter = ({ title }: Props) => {
  //!State
  const initialValues = useMemo(() => {
    return {
      search: "",
      orderBy: "",
    };
  }, []);

  const optionsSortBy = [
    { label: "Most Popular", value: "mostPopular" },
    { label: "Best Rating", value: "bestRating" },
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Price: High to Low", value: "priceHighToLow" },
  ];

  const { filters } = useFiltersHandler({
    PageSize: 10,
    CurrentPage: 1,
    TextSearch: "",
  });

  const { data: dataProduct, loading } = useGetListProduct(
    filters as InitialFilterProduct,
    {
      isTrigger: true,
      refetchKey: "",
      isLoadmore: false,
      saveData: true,
    }
  );

  //!Function

  //!Render
  return (
    <PageWrapper name="CategoryFilter" isLoading={loading}>
      <div className="rounded-md bg-white p-6 shadow-md">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({}) => {
            return (
              <>
                <div className="flex items-center justify-center gap-3 border-b pb-3">
                  {title.length !== 0 && (
                    <h2 className="text-xl font-bold">{title}</h2>
                  )}
                  <FormikField
                    component={InputField}
                    name="search"
                    placeholder={"Search product"}
                    className={"text-text-secondary 2xl:h-9"}
                    extraLeft={
                      <CommonIcons.Search
                        // onClick={() => onClickSearch(values)}
                        className="font-light text-icon-search 2xl:h-4 2xl:w-4"
                      />
                    }
                  />
                  <div className="ml-auto flex items-center">
                    <FormikField
                      component={SelectField}
                      name="sortBy"
                      icon={
                        <CommonIcons.ChevronDown
                          className="ml-2 shrink-0 text-main-primary 2xl:h-auto 2xl:w-[15.6px]"
                          size={36}
                        />
                      }
                      shouldHideSearch
                      placeholder={"Sort by"}
                      className={"text-text-secondary"}
                      options={optionsSortBy || []}
                    />
                  </div>
                </div>
                <div className="mt-3 flex flex-col gap-4 md:flex-row">
                  <div className="w-full md:w-1/4">
                    <ul className="space-y-2">
                      <li>
                        <Link to="#" className="text-gray-700 hover:underline">
                          Man
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-gray-700 hover:underline">
                          Woman
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-gray-700 hover:underline">
                          Sales
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-gray-700 hover:underline">
                          Permanent Collection
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="text-gray-700 hover:underline">
                          New
                        </Link>
                      </li>
                    </ul>
                    <div className="space-y-4">
                      <div className="border-t pt-4">
                        <h5 className="font-bold">Designers</h5>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"Marc Jacobs"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"Marc Jacobs"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"Marc Jacobs"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"Marc Jacobs"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h5 className="font-bold">Size</h5>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"XXS"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"XS"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"S"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"M"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"L"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"XL"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                        <div className="mt-1 space-y-2">
                          <FormikField
                            component={CheckBoxField}
                            name="name"
                            label={"XXL"}
                            classNameLabel="font-light typo-13"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-3/4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {dataProduct.map((product, index) => (
                        <div key={index} className="flex">
                          <CardProduct
                            thumb_src={product.Image}
                            title={product.Name}
                            description={product.Description}
                            price={product.Price}
                            position="center"
                            detailId={product.Id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </PageWrapper>
  );
};

export default CategoryFilter;
