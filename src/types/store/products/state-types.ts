type ProductID = string;

interface Product {
  productID: ProductID,
  name: string,
  imgLink: string,
  category?: string,
  subcategory?: string,
  price: number,
  rate: number
}

// Product interface for expanded card
interface DetailProduct extends Product {
  description?: string,
  comments: Array<CardComment>
}

interface CardComment {
  productID: ProductID,
  userId: string,
  // username: string,
  commentDate?: (Date | string),
  commentContent: string
}

interface State {
  products: Array<Product>
  currentProduct: DetailProduct,
  productDetails: boolean
}

export { State, Product, DetailProduct, CardComment };
