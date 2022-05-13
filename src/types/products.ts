import { CartProduct, Product, ProductCategory } from "./store/products/state-types";

type ProductOrNot = Product | CartProduct | boolean

interface CategoriesSchema {
  toys: ProductCategory,
  health: ProductCategory,
  food: ProductCategory
}

type CategoryClassColors<T> = {
  [K in keyof T]: string
}

type ProductCategories = CategoryClassColors<CategoriesSchema>;

export { ProductOrNot, ProductCategories, CategoriesSchema };
