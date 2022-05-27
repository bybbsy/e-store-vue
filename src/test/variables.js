import Vuex from 'vuex';
import { getters as gettersP } from '../store/products/getters'
import { actions as actionsP } from '../store/products/actions'
import { mutations as mutationsP } from "../store/products/mutations"

import { getters as gettersA } from '../store/auth/getters'
import { actions as actionsA } from '../store/auth/actions'
import { mutations as mutationsA } from "../store/auth/mutations"

const emptyDetailProduct = {
  productID: '',
  name: 'no-name',
  imgLink: '',
  category: '',
  rate: 0,
  price: 0,
  comments: []
}

const mockProduct = {
  productID: '1',
  name: 'Mock product',
  imgLink: 'link',
  category: 'food',
  subcategory: 'bars',
  currency: '$',
  price: 10,
  rate: 1,
  description: 'Description',
  comments: []
}

const mockDetails = {
  productID: "991urn4vRDcJs5TSr7Pc",
  imgLink: "https://www.pngall.com/wp-content/uploads/5/Lego-Toy-PNG-Images.png",
  name:"A lego set",
  rate:4,
  currency:"$",
  description:"Write new chapters in the Star Wars: The Book of Boba Fett saga with this Boba Fett’s Throne Room buildable playset (75326) for fans aged 9 and up. The brick-built palace model opens up for easy access to the detailed throne room, barbecue area and kitchen. There is a throne with a hidden treasure compartment and a pop-up function to eject Bib Fortuna, tilting steps, an opening gate and lots of playful accessories.  Cool characters A top gift for trendsetting kids, the set also includes 7 LEGO® Star Wars™ characters, including new-for-March-2022 Bib Fortuna, Theelin Dancer, Weequay Guard, Gamorrean Guard and Quarren LEGO minifigures, plus assorted weapons. Find step-by-step building instructions in the box and on the free LEGO Building Instructions app.",
  category: "toys",
  price: 100.99,
  comments :[{"commentContent":"An awesome product, I like it","commentDate":"Sat Mar 02 2019 03:04:05 GMT+0300 (Moscow Standard Time)","productID":"991urn4vRDcJs5TSr7Pc","userID":"b5Nq7IRO5fUA15HDIWE1fco80Km1","username":"Quasar Luke","userImage":"https://iconape.com/wp-content/files/co/64687/svg/gopher.svg"},{"commentContent":"Perfect lego set. I bougth it with a coupon :)","commentDate":"Sat Mar 12 2022 03:04:05 GMT+0300 (Moscow Standard Time)","productID":"991urn4vRDcJs5TSr7Pc","userID":"r7tzR3ao2VUimseqWOsGOLN9PPv1","username":"Jennifer Cole","userImage":"https://avatars.mds.yandex.net/get-altay/5483032/2a0000017d90036a212fe3312dc5389df938/XXL"}]
}

const addBtnRole = 'add-button';
const rmBtnRole = 'remove-button';
const cardImageRole = 'card-image';
const detailsCloseBtnRole = 'close-details';
const authError = 'auth-error';
const emailErrorRole = 'email-error';
const passwordErrorRole = 'password-error';

function createStore(detailProduct = emptyDetailProduct) {
  return new Vuex.Store({
    modules: {
      moduleProducts: {
        state: {
          products: [],
          currentProduct: detailProduct,
          productsCart: [ ],
          productDetails: false
        },
        getters: {
          getProductsCart: gettersP.getProductsCart,
          getDetails: gettersP.getDetails,
          getDetailsExpanded: gettersP.getDetailsExpanded,
          getProductsCartLength: gettersP.getProductsCartLength
        },
        actions: {
          setDetails: actionsP.setDetails,
          addToCart: actionsP.addToCart,
          removeFromCart: actionsP.removeFromCart,
        },
        mutations: {
          ADD_TO_CART: mutationsP.ADD_TO_CART,
          DELETE_FROM_CART: mutationsP.DELETE_FROM_CART,
          SET_DETAILS: mutationsP.SET_DETAILS,
          CHANGE_PRODUCT_AMOUNT: mutationsP.CHANGE_PRODUCT_AMOUNT
        }
      },
      moduleAuth: {
        state: {
          user: {
            email: '',
            password: '',
          },
          userFull: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
          },
          userData: {
            imgLink: 'https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png',
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            coupons: [],
            cart: []
          }
        },
        getters: {
          getUserData: gettersA.getUserData
        },
        actions: {
          login: actionsA.login,
          logout: actionsA.logout,
          register: actionsA.register,
          setUserData: actionsA.setUserData
        },
        mutations: {
          SET_USER_DATA: mutationsA.SET_USER_DATA
        }
      }
    }
  })
}

export {
  emptyDetailProduct,
  mockProduct,
  addBtnRole,
  rmBtnRole,
  cardImageRole,
  authError,
  createStore,
  mockDetails,
  emailErrorRole,
  passwordErrorRole
}
