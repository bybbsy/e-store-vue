import { State } from '@/types/store/products/state-types';
import { emptyDetailProduct } from '@/variables';

export const state: State = {
  products: [],
  currentProduct: emptyDetailProduct,
  productsCart: [],
  productDetails: false
}
