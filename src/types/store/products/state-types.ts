type ProductID = string;
type ProductCategory = string;

interface Product {
  productID: ProductID,
  name: string,
  imgLink: string,
  category: ProductCategory,
  subcategory?: string,
  currency?: string,
  price: number,
  rate: number,
  description?: string,
}

interface EditProduct {
  name: string,
  imgLink: string,
  category: ProductCategory,
  currency?: string,
  price: number,
  rate: number,
  description?: string,
}
// Product interface for expanded card
interface DetailProduct extends Product {
  comments: Array<CardComment>
}

interface CartProduct extends Product {
  count: number
}

type AnyProduct = Product | DetailProduct | CartProduct;

interface CardComment {
  productID: ProductID,
  userID: string,
  userImage: string,
  username: string,
  commentDate?: (Date | string),
  commentContent: string
}

interface State {
  products: Array<Product>
  currentProduct: DetailProduct,
  productDetails: boolean,
  productsCart: Array<CartProduct>
}


export {
  State,
  Product,
  DetailProduct,
  CartProduct,
  AnyProduct,
  CardComment,
  ProductCategory,
  EditProduct
};
