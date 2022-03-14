<template>
  <div class="personal-content">
    <div class="cart-content" v-if="getProductsCartLength > 0">
      <v-simple-table dense class="cart-content__table">
        <template v-slot:default>
          <tbody name="list" is="transition-group">
            <tr
              v-for="item in getProductsCart"
              :key="item.productID"
            >
              <td class="table-item">
                <img class="table-item__icon" :src="item.imgLink" >
              </td>
              <td class="table-item">{{ item.name }}</td>
              <td class="table-item"> {{ item.category }}</td>
              <td class="table-item">
                <div class="table-item__buttons">
                  <v-icon @click="handleRemoveFromCart(item)">mdi-minus</v-icon>
                  <span class="table-item__count">{{ item.count }}</span>
                  <v-icon @click="handleAddToCart(item)">mdi-plus</v-icon>
                </div>
              </td>
              <td class="table-item">{{ item.price }}$</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-card class="d-f pa-5 cart-content__order">
        <v-card-title class="d-flex justify-space-between mt-0 mb-5 pa-0 align-baseline">
          <div class="order-title__text d-flex text-h5 pa-0">Total</div>
          <p class="order-title__text d-flex text-h4 text--primary ma-0">{{ getTotal }}$</p>
        </v-card-title>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Items, {{ getProductsCartLength }}</p>
          <p>{{ getSum }}$</p>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Discount</p>
          <p>{{ getDiscount }}$ ({{ discount }}%)</p>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Shipping</p>
          <p>Free</p>
        </v-card-text>
        <v-card-text class="d-flex justify-start px-0">
          <p>Date delivery:</p>
          <p class="mx-2">March 4-6</p>
          <p>(In 5 days)</p>
        </v-card-text>
        <v-card-text class="d-flex justify-start px-0 py-1">
          <p>Payment method:</p>
          <p class="mx-2">Debt card</p>
        </v-card-text>
        <v-item-group class="mt-3">
          <v-btn
          color="warning"
          dark
        >
          Purchase
        </v-btn>
        <v-btn
          class="ml-3"
          color="accent"
          dark
        >
          Appy coupon
        </v-btn>
        </v-item-group>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </div>
    <div class="cart-content empty d-flex flex-column align-center mt-10" v-else>
       <v-toolbar-title class="white--text">Your cart is empty</v-toolbar-title>

       <div class="">
         <v-toolbar-title class="white--text d-inline-flex mr-2 mt-5">Visit our</v-toolbar-title>
         <router-link :to="'/products'">Products page</router-link>
       </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CartProduct } from '@/types/store/products/state-types';
import Vue from 'vue';
import { sendCartToFirebase } from '@/helpers/useProducts';
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default Vue.extend({
  data () {
    return {
      discount: 30
    }
  },
  computed: {
    ...mapGetters([
      'getProductsCart',
      'getProductsCartLength'
    ]),
    receiveData(): Array<CartProduct> {
      return this.getProductsCart;
    },
    getSum(): number {
      return _.round(this.getProductsCart.reduce((prev: number, current: CartProduct) => prev + (current.price * current.count), 0), 2);
    },
    getTotal(): number {
      if(this.discount > 0) {
        return _.round((this.getSum - this.getDiscount), 2);
      }
      return this.getSum;
    },
    getDiscount(): number {
      return _.round(this.getSum * (this.discount / 100),2)
    }
  },
  methods: {
    ...mapActions([
      'addToCart',
      'removeFromCart'
    ]),
    handleAddToCart(item: CartProduct) {
      this.addToCart(item);
      sendCartToFirebase(this.getProductsCart);
    },
    handleRemoveFromCart(item: CartProduct) {
      this.removeFromCart(item);
      sendCartToFirebase(this.getProductsCart);
    }
  }
})
</script>>

<style>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: scale(0);
}
.list-move {
  transition: transform 0.5s;
}
.item-row {
  display: table-row;
}

.cart-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.cart-content__table {
  width: 70%;
}

.table-item__icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.table-item__buttons {
  font-size: 1.2em;
  width: 165px;
}

.table-item__button {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 15px;
  background-color: transparent;
  transition: 0.2s all ease;
}

.table-item__button::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  border: 1px solid gray;
  border-radius: 50%;
  z-index: 0;
}

.table-item__button:hover {
  transform: scale(1.1);
}

.table-item__button:active {
  transform: scale(1.2);
}

.cart-content__order {
  position: sticky;
  top: 20px;
  width: 30%;
  margin-left: 15px;
  height: auto;
}
</style>
