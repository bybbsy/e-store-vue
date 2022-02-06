<template>
    <div class="product__card" @click="cardClick">
      <div class="card__image card__image_toys">
        <img src="~@/assets/mock/Item1.png" alt="">
      </div>
      <div class="card__content">
        <div class="title">El Batipato de Batman</div>
        <div class="rate-block">
          <div class="rate-block__stars">
            <div class="star">
              <img src="" alt="">
            </div>
          </div>
          <div class="rate-block__value">3.5</div>
        </div>
      </div>
      <div class="card__bottom card__bottom_default-card">
        <div class="price">$14.81</div>
        <div class="card__button card__button_add">
          <div class="button__text">Añadir al Carrito</div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'default-card',
  props: {
    detailsExpanded: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      toggledDetails: this.detailsExpanded
    }
  },
  methods: {
      cardClick() {
        this.toggledDetails = !this.toggledDetails;
        this.$emit('toggle-details', this.toggledDetails);
      }
    },
})
</script>

<style>
.product__card {
  position: relative;
  width: 370px;
  height: 440px;
  border-radius: 15px;
  background-color: #28272B;
  border: 1px solid red;
  cursor: pointer;
  z-index: 2;
  overflow: hidden;
  /* margin: 15px 13px; */
  /* margin-right: 25px; */
}

.card__image_toys {
  background-color: #5DBF79;
}

.card__image_food {
  background-color: #FFA049;
}

.card__image_health {
  background-color: #485fe2;
}

.card__image {
  position: relative;
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

.card__bottom {
  flex-wrap: wrap;
}

.card__bottom_default-card {
  align-items: center;
  justify-content: space-between;
  margin: 0 25px;
}

.card__button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 225px;
  min-height: 50px;
  border-radius: 25px;
  padding: 10px 18px;
}

.card__button_add {
  background-color: #FFA049;
  background-image: url('~@/assets/base/PlusCircle.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 18px 10px;
  color: #fff;
}

.button__text {
  width: 100%;
  text-align: right;
  /* font-size: 1; */
  font-size: 1.125em;
  font-weight: 500;
  line-height: 150%;
}
</style>
