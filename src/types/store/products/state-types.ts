interface Product {
  name: string,
  imageLink: string,
  category?: string,
  subcategory?: string,
  price: string,
  rate: string
  reviews: number,
}

// Product interface for expanded card
interface CardProduct extends Product {
  comments: Array<CardComment>
}

interface CardComment {
  author: {
    firstname: string,
    lastname: string
  },
  date?: (Date | string),
  content: string
}

interface State {
  products: Array<CardProduct>
  currentProduct: (CardProduct | null),
  productDetails: boolean
}

export { State, Product, CardProduct, CardComment };
