<template>
  <div class="page">
      <header class="header">
        <h5 class="view-title text-white">Your coupons</h5>
      </header>
      <main class="main-content">
        <section class="coupons-content">
          <Coupon v-for="(item, index) in couponsList" :key="index" :coupon="item"/>
        </section>
      </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Coupon from '@/components/Coupon.vue';
import moment from 'moment';

export default Vue.extend({
  data() {
    return {
      couponsList: [
        {
          image: '',
          discount: {
            amount: 20,
            type: 'percent'
          },
          category: 'toys',
          dateExp: new Date(2023, 4, 1, 14),
          description: '100$ off for each toys you pick up. You can easily apply this coupon to the current products in the cart or delete it.'
        },
        {
          image: '',
          discount: {
            amount: 10,
            type: 'currency'
          },
          category: 'all',
          dateExp: new Date(2022, 5, 2, 14),
          description: '100$ off for each toys you pick up'
        },
        {
          image: 'https://image.similarpng.com/very-thumbnail/2020/06/Slice-pizza-with-cheese-clipart-PNG.png',
          discount: {
            amount: 100,
            type: 'currency'
          },
          category: 'food',
          dateExp: new Date(2023, 2, 1, 14),
          description: '20% off on any pizza: NY style pepperoni, chichen and cheese, '
        },
        {
          image: 'https://www.pngfind.com/pngs/m/353-3538494_healthy-clip-art-food-hd-png-download.png',
          discount: {
            amount: 100,
            type: 'currency'
          },
          category: 'food',
          subcategory: 'pizza',
          dateExp: new Date(2023, 2, 1, 14),
          description: '5% off on frozen product you want.'
        },
        {
          image: 'https://png.pngtree.com/png-clipart/20200701/original/pngtree-health-products-vitamins-png-image_5414239.jpg',
          discount: {
            amount: 50,
            type: 'percent'
          },
          category: 'health',
          dateExp: new Date(2023, 3, 1, 5),
          description: '100$ off on: pills, syrops'
        },
      ]
    }
  },
  mounted() {
    console.log(moment(new Date(2007, 3, 1, 5)).toNow())
  },
  components: {
    Coupon
  }
})
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Base styles */
.header {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
}

.main-content {
  display: flex;
  width: 100%;
}

.coupons-content {
  display: grid;
  min-width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(350px, 400px));
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 15px;
}

.coupon {
  position: relative;
  display: grid;
  min-height: 100px;
  border-radius: 25px;
  padding: 5px 20px;
  transition: 0.2s all ease;
  cursor: pointer;
}

.coupon::before,
.coupon::after {
  content: '';
  position: absolute;
  display: none;
  width: 30px;
  height: 30px;
  background-color: var(--main-dark);
  border-radius: 50%;
}

.coupon:hover {
  transform: scale(1.05);
}

.coupon-inner {
  display: flex;
}

.item-image {
  display: flex;
  margin: auto;
  width: 80px;
  object-fit: contain;
}

.date-expire {
  display: flex;
  margin: auto 0 5px 0;
  font-size: 0.8em;
}

.b-r {
  border-right: 2px;
}

.b-b {
  border-bottom: 2px;
}

.b-dashed {
  border-style: dashed;
}

.b-light-gray {
  border-color: var(--darker-blue);
}

/*  margins */

.m-t-normal-1 {
  margin-top: 15px;
}

.m-y-normal-1 {
  margin-top: 15px;
  margin-bottom: 15px;
}

.m-y-small-1 {
  margin-top: 2px;
  margin-bottom: 2px;
}

.m-y-small-2 {
  margin-top: 4px;
  margin-bottom: 4px;
}

.m-y-small-3 {
  margin-top: 6px;
  margin-bottom: 6px;
}

.m-y-small-4 {
  margin-top: 8px;
  margin-bottom: 8px;
}

.m-y-small-5 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.m-r-small-1 {
  margin-right: 2px;
}


.m-a-auto {
  margin: auto;
}
/* paddings */

.p-l-normal {
  padding-left: 15px;

}

.group {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.btn {
  border-radius: 5px;
  margin: 0 15px;
  padding: 5px 0;
  font-weight: 500;
  font-size: 1.1em;
  width: 100%;
  text-transform: uppercase;
  color: var(--main-white)
}


.btn-success {
  background-color: var(--main-success);
}

.btn-error {
  background-color: var(--main-error);
}

.btn-success:hover {
  background-color: var(--secondary-success);
}

.btn-error:hover {
  background-color: var(--secondary-error);
}
/* Skins */

.view-title {
  display: flex;
  font-size: 1.5em;
}

/* -- text colors --- */

.text-white {
  color: var(--main-white);
}

.text-dark {
  color: var(--main-dark);
}

.text-description {
  color: var(--text-description);
}

/* -- themes -- */

.theme-white {
  background-color: var(--main-white);
}


.discount-value {
  font-size: 1.2em;
}

.fw-thick {
  font-weight: 500;
}


/* -- coupons placements -- */

.pos-horizontal {
  grid-template-columns: 1fr 2fr;
}

.pos-vertical {
  grid-template-rows: 2fr 1fr;
  /* height: 550px; */
}

.pos-horizontal::before,
.pos-horizontal::after,
.pos-vertical::before,
.pos-vertical::after {
  display: block;
}

.pos-horizontal::before {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
}

.pos-horizontal::after {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
}

.pos-vertical::before {
  top: 67%;
  left: 0;
  transform: translate(-50%, -67%);
}

.pos-vertical::after {
  top: 67%;
  right: 0;
  transform: translate(50%, -67%);
}

.f-column {
  flex-direction: column;
}
</style>
