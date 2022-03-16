<template>
    <div class="product__card" :class="getClass" @click="cardClick">
      <div class="card__image">
        <!-- <img :src="require('@/assets/img/mock/' + product.imgLink)" alt=""> -->
        <img :src="product.imgLink">
      </div>
      <div class="card__content">
        <div class="title title__card_short">{{ product.name }}</div>
        <div class="rate-block">
          <Rating :rate="product.rate"/>
          <div class="rate-block__value">{{ product.rate }}</div>
        </div>
      </div>
      <div class="card__bottom card__bottom_default-card">
        <div class="price">${{ product.price }}</div>

        <Button v-if="!isInCart" button-text="Add to cart" :class="'card__button_add'" @click.stop.native="handleAddToCart"/>
        <Button v-else button-text="Remove item" :class="'card__button_remove'" @click.stop.native="handleRemoveFromCart"/>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Rating from './Rating.vue';
import { Product, ProductCategory } from '@/types/store/products/state-types';
import { mapActions, mapGetters } from 'vuex';
import { toggleDetails, isProductInACart, sendCartToFirebase } from '@/helpers/useProducts';
import { CategoriesSchema, ProductOrNot } from '@/types/products';
import { emptyDetailProduct, productBackgroundColors } from '@/variables';
import _ from 'lodash';

import Button from '@/components/Button.vue';

export default Vue.extend({
  name: 'default-card',
  props: {
    product: Object as PropType<Product>,
  },
  computed: {
    ...mapGetters([
      'getProductsCart',
      'getDetails',
      'getDetailsExpanded'
    ]),
    isInCart(): ProductOrNot {
      return isProductInACart(this.getProductsCart, this.product);
    },
    getClass(): string {
      return productBackgroundColors[this.product.category as keyof CategoriesSchema];
    }
  },
  methods: {
    ...mapActions([
      'setDetails',
      'addToCart',
      'removeFromCart'
    ]),
    // async clickWrapper() {
    //   const details = this.getDetails;

    //   // If first click
    //   if(!details.productID) {
    //     await toggleDetails(true, this.product);
    //   }
    //   // If click on another card
    //   else if(details.productID !== this.product.productID) {
    //     await toggleDetails(false, this.product);
    //   }
    //   // If double click
    //   else {
    //     await toggleDetails(true, emptyDetailProduct);
    //   }
    // },
    cardClick: _.debounce(async function(this: any) {
      const details = this.getDetails;
      const detailsState = this.getDetailsExpanded;

      console.log(detailsState)
      // If first click or if menu state is false, but the content is loaded;
      if(!details.productID || (details.productID && !detailsState)) {
        await toggleDetails(true, this.product);
      }
      // If click on another card
      else if(details.productID !== this.product.productID) {
        await toggleDetails(false, this.product);
      }
      // If dobule click on this product
      else if(details.productID && detailsState) {
        await toggleDetails(true, emptyDetailProduct);
      }
    }, 200),
    handleAddToCart() {
      this.addToCart(this.product);
      sendCartToFirebase(this.getProductsCart);
    },
    handleRemoveFromCart() {
      this.removeFromCart(this.product);
      sendCartToFirebase(this.getProductsCart);
    }
  },
  components: {
    Rating, Button
  }
})
</script>

<style>

.product__card {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  padding-bottom: 30px;
  border-radius: 15px;
  background-color: var(--secondary-dark);
  cursor: pointer;
  z-index: 10;
  overflow: hidden;
  transition: all 0.3s;
}

.product__card::before {
  content: '';
  position: absolute;
  top: 1px;
  border-radius: inherit;
  width: 100%;
  height: calc(100% - 2px);
  transition: .5s all ease-out;
  z-index: -1;
  border: 2px solid transparent;
}

.title__card_short {
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product__card_toys .card__image{
  background-color: var(--main-success);
}

.product__card_toys:hover::before  {
  border-color: var(--main-success);
}

.product__card_food .card__image {
  background-color: var(--main-orange);
}

.product__card_food:hover::before  {
  border-color: var(--main-orange);
}

.product__card_health .card__image {
  background-color: var(--main-blue);
}

.product__card_health:hover::before  {
  border-color: var(--secondary-blue);
}

.card__image {
  position: relative;
  display: flex;
  height: 200px;
  z-index: 1;
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card__content {
  margin: 25px 25px 30px;
}

.rate-block {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.rate-block__value {
  display: flex;
  font-size: 1em;
  font-weight: 400;
  line-height: 150%;
  margin-left: 8px;
  color: var(--text-gray);
}

.card__bottom {
  flex-wrap: wrap;
  align-items: center;
}

.card__bottom_default-card {
  justify-content: space-between;
  margin: auto 25px 0;
}


@media screen and (max-width: 980px) {
  .card__image {
    height: 150px;
  }

  .title {
    font-size: 1.2em;
  }

  .card__bottom .price {
    font-size: 1.5em;
  }
}
</style>
