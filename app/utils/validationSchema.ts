import * as Yup from "yup";
import categories from "./categories";

// Custom validator function for file size (1MB limit)
const fileValidator = (file: File) => {
  if (!file) return true; // Optional field, so it's valid if not provided
  return file.size <= 1024 * 1024;
};

const commonSchema = {
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  bulletPoints: Yup.array().of(Yup.string()),
  mrp: Yup.number().required("MRP is required"),
  salePrice: Yup.number()
    .required("Sale price is required")
    .lessThan(Yup.ref("mrp"), "Sale price must be less than MRP"),
  category: Yup.string()
    .required("Category is required")
    .oneOf(categories, "Invalid category"),
  quantity: Yup.number().required("Quantity is required").integer(),
  images: Yup.array().of(
    Yup.mixed().test("fileSize", "Image should be less than 1MB", (file) =>
      fileValidator(file as File)
    )
  ),
};

// Define the validation schema
export const newProductInfoSchema = Yup.object().shape({
  ...commonSchema,
  thumbnail: Yup.mixed()
    .required("Thumbnail is required")
    .test("fileSize", "Thumbnail should be less than 1MB", (file) =>
      fileValidator(file as File)
    ),
});

export const updateProductInfoSchema = Yup.object().shape({
  ...commonSchema,
});
