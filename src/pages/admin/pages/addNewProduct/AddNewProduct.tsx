"use client";

import FormikField from "@/components/customFieldsFormik/FormikField";
import InputField from "@/components/customFieldsFormik/InputField";
import LoadingScreen from "@/components/loadingScreen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { showError, showSuccess } from "@/helpers/toast";
import httpService from "@/services/httpService";
import useGetCateGory from "@/services/modules/category/hooks/useGetCategory";
import useGetDetailProduct from "@/services/modules/product/hooks/useGetDetailProduct";
import productService from "@/services/modules/product/productService";
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

export interface ProductFormValues {
  Name: string;
  ThumbnailImage: string;
  Category: string;
  Price: string;
  Description: string;
  Images: string[];
}

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  ThumbnailImage: Yup.string().required("Thumbnail image is required"),
  Category: Yup.string().required("Category is required"),
  Price: Yup.string()
    .required("Price is required")
    .matches(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  Description: Yup.string().required("Description is required"),
  Images: Yup.array().min(1, "At least one image is required"),
});

const AddNewProduct = () => {
  const [uploading, setUploading] = useState(false);
  const token = httpService.getTokenStorage();
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetDetailProduct(id as string | undefined, {
    isTrigger: !!id,
  });

  const { category } = useGetCateGory();

  const initialValues: ProductFormValues = {
    Name: data?.Name || "",
    ThumbnailImage: data?.Image || "",
    Category: data?.Category || "",
    Price: data?.Price ? data.Price.toString() : "",
    Description: data?.Description || "",
    Images: data?.FileList || [],
  };

  const handleSubmit = async (values: ProductFormValues) => {
    const bodyUpload = new FormData();
    try {
      bodyUpload.append("Name", values.Name);
      bodyUpload.append("Category", values.Category);
      bodyUpload.append("Price", values.Price);
      bodyUpload.append("Description", values.Description);
      bodyUpload.append("ThumbnailImage", (file as Blob) || data?.Image);
      bodyUpload.append("Images", JSON.stringify(values.Images));

      httpService.attachTokenToHeader(token);
      if (id) {
        await productService.postUpdateProduct(id, bodyUpload);
        navigate(-1);
        showSuccess("Product updated successfully");
        return;
      }

      await productService.postAddNewProduct(bodyUpload);
      navigate(-1);
      showSuccess("Product added successfully");
    } catch (error) {
      showError("Failed to add product");
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    setFieldValue: (field: string, value: any) => void,
    values: ProductFormValues
  ) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      if (field === "ThumbnailImage") {
        setFieldValue(field, urls[0]);
      } else {
        setFieldValue(field, [...values.Images, ...urls]);
      }
    } catch (error) {
      showError(error);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">
        {id ? "Update Product" : "Add New Product"}
      </h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6" id="product-form">
              <div className="space-y-2">
                {/* <Label htmlFor="name">Name</Label>
                <Input
                  id="Name"
                  placeholder="Enter product name"
                  onChange={(e) => setFieldValue("Name", e.target.value)}
                  value={values.Name}
                /> */}
                <FormikField
                  name="Name"
                  label="Name"
                  placeholder="Enter product name"
                  component={InputField}
                />
                {/* {touched.Name && errors.Name && (
                    <p className="text-sm text-red-500">{errors.Name}</p>
                  )} */}
              </div>

              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <div className="flex items-center gap-4">
                  {values.ThumbnailImage ? (
                    <div className="relative h-24 w-24">
                      <img
                        src={values.ThumbnailImage}
                        alt="ThumbnailImage"
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFieldValue("ThumbnailImage", "")}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFieldValue(
                              "ThumbnailImage",
                              URL.createObjectURL(file)
                            );
                            setFile(file);
                          }
                        }}
                        className="absolute h-24 w-24 cursor-pointer opacity-0"
                      />
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                {touched.ThumbnailImage && errors.ThumbnailImage && (
                  <p className="text-sm text-red-500">
                    {errors.ThumbnailImage}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={values.Category}
                  onValueChange={(value) => setFieldValue("Category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((category) => (
                      <SelectItem key={category.Id} value={category.Id}>
                        {category.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.Category && errors.Category && (
                  <p className="text-sm text-red-500">{errors.Category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="Price"
                  placeholder="Enter price"
                  onChange={(e) => setFieldValue("Price", e.target.value)}
                  value={values.Price}
                />
                {touched.Price && errors.Price && (
                  <p className="text-sm text-red-500">{errors.Price}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="Description"
                  placeholder="Enter product description"
                  onChange={(e) => setFieldValue("Description", e.target.value)}
                  value={values.Description}
                  rows={4}
                />
                {touched.Description && errors.Description && (
                  <p className="text-sm text-red-500">{errors.Description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Additional Images</Label>
                <div className="grid grid-cols-9 gap-4">
                  {values.Images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative h-24 w-24"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-full w-full rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(
                            "Images",
                            values.Images.filter((_, i) => i !== index)
                          )
                        }
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                  {values.Images.length < 8 && (
                    <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                          handleImageUpload(e, "Images", setFieldValue, values)
                        }
                        className="absolute h-24 w-24 cursor-pointer opacity-0"
                      />
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
                {touched.Images && errors.Images && (
                  <p className="text-sm text-red-500">{errors.Images}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="min-w-[100px]"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : id ? (
                    "Update Product"
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewProduct;
