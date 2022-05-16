<template>
  <div class="couponsPage">
      <header class="header">
        <h5 class="viewTitle textWhite">Your coupons</h5>
      </header>
      <main class="mainContent">
        <section class="couponsContent">
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

<style scoped>
@import '~@/assets/css/OOCSS/index.css';
</style>
