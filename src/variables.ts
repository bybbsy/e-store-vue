import { SignupFormOptions, SigninFormOptions, SignupFormFields, InputError } from '@/types/auth';
import { CategoriesSchema } from '@/types/products';
import { DetailProduct } from './types/store/products/state-types';

const signinFormOptions: SigninFormOptions = {
  userEmail: {
    required: true,
    minLength: 6
  },
  userPassword: {
    required: true,
    minLength: 6
  }
}

const signupFormOptions: SignupFormOptions = {
  firstname: {
    required: true,
    minLength: 2
  },
  lastname: {
    required: true,
    minLength: 2
  },
  userEmail: {
    required: true,
    minLength: 6
  },
  userPassword: {
    required: true,
    minLength: 6
  },
  repeatUserPassword: {
    required: true,
    minLength: 6
  }
}

const emptyDetailProduct: DetailProduct = {
  // #TODO Add product ID
  // #TODO Add default image while loading data
  productID: '',
  name: 'no-name',
  imgLink: '',
  category: '',
  rate: 0,
  price: 0,
  comments: []
}

const productBackgroundColors: CategoriesSchema = {
  toys: 'product__card_toys',
  health: 'product__card_health',
  food: 'product__card_food'
}

const emptyEmail: InputError = {
  invalid: true,
  errorMessage: '',
  params: {
    minLength: signupFormOptions.userEmail.minLength.toString(),
  }
}

const emptyPassword: InputError = {
  invalid: true,
  errorMessage: '',
  params: {
    minLength: signupFormOptions.userPassword.minLength.toString(),
  }
}

const emptyFirstname: InputError = {
  invalid: true,
  errorMessage: '',
  params: {
    minLength: signupFormOptions.firstname.minLength.toString(),
  }
}

const emptyLastname: InputError = {
  invalid: true,
  errorMessage: '',
  params: {
    minLength: signupFormOptions.lastname.minLength.toString(),
  }
}


export {
  signinFormOptions,
  signupFormOptions,
  emptyDetailProduct,
  productBackgroundColors,
  emptyFirstname,
  emptyLastname,
  emptyEmail,
  emptyPassword
};
