interface Product {
  name: string,
  imageLink: string,
  category?: string,
  subcategory?: string,
  price: string,
  rate: string
}

// Product interface for expanded card
interface CardProduct extends Product {
  reviews: number,
  comments: Array<CardComment>
}

interface CardComment {
  author: {
    firstname: string,
    lastname: string
  },
  content: string
}

interface State {
  products: Array<CardProduct>
  currentProduct: (CardProduct | null),
  productDetails: boolean
}

export { State, Product, CardProduct, CardComment };
