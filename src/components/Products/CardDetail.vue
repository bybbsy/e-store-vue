<template>
  <div class="product__card product__card_health product__card_expanded _hide-scroll" v-if="productExists" >
    <div class="card-container _hide-scroll">
      <div class="card__image card__image_detail">
      <!-- <img :src="require('@/assets/img/mock/' + productDetail.imgLink)" alt=""> -->
      <img :src="productDetail.imgLink">
    </div>
    <div class="card__content">
      <div class="title title__card_short">{{ productDetail.name }}</div>
      <div class="description description__card">{{ productDetail.description }}</div>
      <div class="rate-block rate-block_detail">
        <Rating :rate="productDetail.rate" />
        <div class="rate-block__value">{{ productDetail.rate }}</div>
      </div>
    </div>
    <div class="card__bottom card__bottom_detail-card">
      <div class="price">${{ productDetail.price }}</div>
      <div class="card__button card__button_add" v-if="!isInCart" @click.stop="handleAddToCart">
        <div class="button__text">Add to cart</div>
      </div>
      <div class="card__button card__button_remove" v-else @click.stop="handleRemoveFromCart">
        <div class="button__text">Remove from cart</div>
      </div>
    </div>

    <div class="card__comments">
      <div class="title card__comments_title">Comments</div>
      <ul class="comments__list" v-if="productDetail.comments">
        <li class="comments__comment" v-for="(comment, index) in productDetail.comments" :key='index'>
          <div class="comment__icon">
            <img src="~@/assets/img/mock/Avatar.jpg" alt="">
          </div>
          <div class="comment__content">
            <div class="comment__top">
              <div class="comment__author">{{ comment.username }}</div>
              <div class="comment__date">{{ dateWithFns(comment.commentDate) }}</div>
            </div>
            <div class="comment__text">{{ comment.commentContent  }}</div>
          </div>
        </li>
      </ul>
      <div v-else>No comments</div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Rating from './Rating.vue';
import moment from 'moment';
import { formatDistance, subDays } from 'date-fns';
import { mapActions, mapGetters, ActionMethod } from 'vuex';
import { ProductOrNot } from '@/types/products';
import { isProductInACart } from '@/helpers/useProducts';

export default Vue.extend({
  name: 'detail-card',
  computed: {
    ...mapGetters({
      getProductsCart: 'getProductsCart',
      productDetail: 'getDetails'
    }),
    productExists(): boolean {
      return this.productDetail.productID.length > 0;
    },
    isInCart(): ProductOrNot {
      return isProductInACart(this.getProductsCart, this.productDetail);
    }
  },
  methods: {
    ...mapActions([
      'addToCart',
      'removeFromCart'
    ]),
    handleAddToCart()  {
      this.addToCart(this.productDetail);
    },
    handleRemoveFromCart() {
      this.removeFromCart(this.productDetail);
    },
    dateWithMoment(date: Date) {
      date = new Date(2022)
    },
    dateWithFns(date: string) {
      let correctDate = Date.parse(date)
      return formatDistance(subDays(correctDate, 3), new Date(), { addSuffix: true })
    },
  },
  components: {
    Rating
  }
})
</script>

<style>
.card-container {
  min-height: 100%;
  overflow: scroll;
  border-radius: inherit;
}

.product__card_expanded {
  width: 100%;
  max-width: 550px;
  height: 100%;
  overflow-y: scroll;
  cursor: initial;
  padding-bottom: 10px;
}

.card__image_detail {
  height: 390px;
}

.description {
  font-size: 16px;
  line-height: 150%;
  font-weight: 400;
  color: var(--main-white);
}

.card__bottom_detail-card {
  margin: 0 25px;
  flex-direction: column;
  align-items: flex-start;
}

.card__bottom_detail-card .card__button {
  margin-top: 20px;
  cursor: pointer;
}

.rate-block_detail {
  margin-top: 40px;
}

.card__comments {
  margin: 40px 25px 0;
}

.card__comments_title {
  text-align: center;
}

.comments__list {
  margin-top: 25px;
}

.comments__comment {
  display: flex;
}

.comments__comment:not(:first-child) {
  margin-top: 25px;
}

.comment__icon {
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  margin-right: 30px;
  border-radius: 50%;
  overflow: hidden;
}

.comment__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.comment__top {
  display: flex;
  align-items: baseline;
}

.comment__author {
  color: var(--main-white);
  font-size: 1.125em;
  text-align: left;
  font-weight: 500;
}


.comment__date {
  color: var(--main-white);
  font-size: 0.8em;
  margin-left: 15px;
}

.comment__text {
  margin-top: 5px;
  color: var(--text-gray);
  font-size: 1em;
  text-align: justify;
  font-weight: 300;
  line-height: 150%;
}
</style>
