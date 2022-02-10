interface Product {
  name: string,
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

interface Products {
  products: Array<CardProduct>
}

export { Product, Products, CardProduct, CardComment };
