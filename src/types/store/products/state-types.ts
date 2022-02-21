interface Product {
  name: string,
  imgLink: string,
  category?: string,
  subcategory?: string,
  price: number,
  rate: number
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
  products: Array<Product>
  currentProduct: (CardProduct | null),
  productDetails: boolean
}

export { State, Product, CardProduct, CardComment };
