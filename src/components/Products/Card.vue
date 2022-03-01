<template>
    <div class="product__card product__card_health" @click="cardClick">
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
        <div class="card__button card__button_add" v-if="!isInCart" @click.stop="handleAddToCart">
          <div class="button__text">Add to cart</div>
        </div>
        <div class="card__button card__button_remove" v-else @click.stop="handleRemoveFromCart">
          <div class="button__text">Remove from cart</div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Rating from './Rating.vue';
import { Product } from '@/types/store/products/state-types';
import { mapActions, mapGetters } from 'vuex';
import { toggleDetails, isProductInACart } from '@/helpers/useProducts';
import { ProductOrNot } from '@/types/products';
import { emptyDetailProduct } from '@/variables';

export default Vue.extend({
  name: 'default-card',
  props: {
    product: Object as PropType<Product>,
  },
  computed: {
    ...mapGetters([
      'getProductsCart',
      'getDetails'
    ]),
    isInCart(): ProductOrNot {
      return isProductInACart(this.getProductsCart, this.product);
    },
  },
  methods: {
    ...mapActions([
      'toggleDetails',
      'setDetails',
      'addToCart',
      'removeFromCart'
    ]),
    async cardClick() {
      const details = this.getDetails;

      // If first click
      if(!details.productID) {
        await toggleDetails(true, this.product);
      }
      // If click on another card
      else if(details.productID !== this.product.productID) {
        await toggleDetails(false, this.product);
      }
      // If double click
      else {
        await toggleDetails(true, emptyDetailProduct);
      }
    },
    handleAddToCart() {
      this.addToCart(this.product);
    },
    handleRemoveFromCart() {
      this.removeFromCart(this.product);
    }
  },
  components: {
    Rating
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

.card__button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 50px;
  border-radius: 25px;
  padding: 10px 18px 10px 50px;
}

.card__button_add {
  background-color: var(--main-orange);
  background-image: url('~@/assets/img/base/PlusCircle.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 18px 50%;
  color: var(--main-white);
  transition: 0.2s all ease;
}

.card__button_remove {
  background-color: var(--secondary-error);
  background-image: url('~@/assets/img/base/recycle-bin.png');
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 15px 50%;
  color: var(--main-white);
  transition: 0.2s all ease;
}

.card__button_remove:hover {
  background-color: var(--main-error);
}

.card__button_add:hover {
  background-color: var(--button-orange);
}

.button__text {
  width: 100%;
  text-align: right;
  font-size: 1.125em;
  font-weight: 500;
  line-height: 150%;
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

  .card__button {
    min-width: 150px;
    min-height: 40px;
    padding: 7px 15px 7px 45px;
  }

  .card__button_add {
    background-position: 15px 7px;
    background-size: 25px 25px;
  }

}
</style>
