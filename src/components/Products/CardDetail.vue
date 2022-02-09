<template>
  <div class="product__card product__card_health product__card_expanded _hide-scroll">
      <div class="card__image card__image_detail">
        <img src="~@/assets/img/mock/Item1.png" alt="">
      </div>
      <div class="card__content">
        <div class="title title__card_short">El Batipato de Batman</div>
        <div class="description description__card">Patito de hule que usa batman para acompañar
sus seciones de baño.</div>
        <div class="rate-block rate-block_detail">
          <Rating/>
          <div class="rate-block__value">3.5</div>
        </div>
      </div>
      <div class="card__bottom card__bottom_detail-card">
        <div class="price">$14.81</div>
        <div class="card__button card__button_add" @click.stop="addToCart">
          <div class="button__text">Add to cart</div>
        </div>
      </div>

      <div class="card__comments">
        <div class="title card__comments_title">Algunas opiniones sobre este juguete</div>
        <ul class="comments__list">
          <li class="comments__comment">
            <div class="comment__icon">
              <img src="~@/assets/img/mock/Avatar.jpg" alt="">
            </div>
            <div class="comment__content">
              <div class="comment__author">Author John Doe</div>
              <div class="comment__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ullam in nam, illum sapiente tempore quasi. Accusantium placeat labore, recusandae saepe tenetur incidunt, corporis, dicta inventore quaerat tempora optio voluptate!</div>
            </div>
          </li>
          <li class="comments__comment">
            <div class="comment__icon">
              <img src="~@/assets/img/mock/Avatar.jpg" alt="">
            </div>
            <div class="comment__content">
              <div class="comment__author">Author John Doe</div>
              <div class="comment__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ullam in nam, illum sapiente tempore quasi. Accusantium placeat labore, recusandae saepe tenetur incidunt, corporis, dicta inventore quaerat tempora optio voluptate!</div>
            </div>
          </li>
          <li class="comments__comment">
            <div class="comment__icon">
              <img src="~@/assets/img/mock/Avatar.jpg" alt="">
            </div>
            <div class="comment__content">
              <div class="comment__author">Author John Doe</div>
              <div class="comment__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus ullam in nam, illum sapiente tempore quasi. Accusantium placeat labore, recusandae saepe tenetur incidunt, corporis, dicta inventore quaerat tempora optio voluptate!</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Rating from './Rating.vue';

export default Vue.extend({
  components: {
    Rating
  }
})
</script>

<style>

.product__card_expanded {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  cursor: initial;
}

.card__image_detail {
  height: 390px;
}


.card__image_detail img {
  display: flex;
  margin: auto;
  width: unset;
  height: unset;
}

.description {
  font-size: 16px;
  line-height: 150%;
  font-weight: 400;
  color: #FFFFFF;
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

.comment__author {
  color: #fff;
  font-size: 1.125em;
  text-align: left;
  font-weight: 500;
}

.comment__text {
  margin-top: 5px;
  color:#FFFFFF66;
  font-size: 1em;
  text-align: justify;
  font-weight: 300;
  line-height: 150%;
}
</style>
