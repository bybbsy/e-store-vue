interface Product {
  name: string,
  imageLink: string,
  category: string,
  subcategory: string,
  price: string
}

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
}

export { State, Product, CardProduct, CardComment };
