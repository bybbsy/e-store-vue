import { State } from '@/types/store/products/state-types';

export const state: State = {
  products: [],
  currentProduct: {
    // #TODO Add product ID
    // #TODO Add default image while loading data
    name: 'no-name',
    imgLink: '',
    rate: 0,
    price: 0,
    comments: []
  },
  productDetails: false
}
