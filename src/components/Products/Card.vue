<template>
    <div class="product__card product__card_health" @click="cardClick">
      <div class="card__image">
        <img :src="require('@/assets/img/mock/' + productItem.imgLink)" alt="">
      </div>
      <div class="card__content">
        <div class="title title__card_short">{{ productItem.name }}</div>
        <div class="rate-block">
          <Rating :rate="productItem.rate"/>
          <div class="rate-block__value">{{ productItem.rate }}</div>
        </div>
      </div>
      <div class="card__bottom card__bottom_default-card">
        <div class="price">${{ productItem.price }}</div>
        <div class="card__button card__button_add" @click.stop="addToCart">
          <div class="button__text">Add to cart</div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Rating from './Rating.vue';

interface ProductItem {
  name: string,
  rate: number,
  price: number,
  imgLink: string
}

export default Vue.extend({
  name: 'default-card',
  props: {
    productItem: Object as PropType<ProductItem>
  },
  data() {
    return {
      cardMobile: ''
    }
  },
  methods: {
      cardClick() {
        console.log('Click');
        this.$store.dispatch('toggleDetails');
        this.$store.dispatch('fetchComments', 'productId successfully passed')
      },
      addToCart() {
        console.log("Added to cart")
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
  background-color: #28272B;
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
  background-color: #5DBF79;
}

.product__card_toys:hover::before  {
  border-color: #5DBF79;
}

.product__card_food .card__image {
  background-color: #FFA049;
}

.product__card_food:hover::before  {
  border-color: #FFA049;
}

.product__card_health .card__image {
  background-color: #485fe2;
}

.product__card_health:hover::before  {
  border-color: #485fe2;
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
  color: rgba(255, 255, 255, 0.4);
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
  background-color: #FFA049;
  background-image: url('~@/assets/img/base/PlusCircle.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 18px 10px;
  color: #fff;
  transition: 0.2s all ease;
}

.card__button_add:hover {
  background-color: #ffbf49;
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
