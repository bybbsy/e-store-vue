<template>
  <div class="coupon theme-white" :class="{ 'pos-horizontal': !isExpanded, 'pos-vertical': isExpanded }" @click="toggleCoupon">
    <div class="coupon-inner f-column b-dashed b-light-gray" :class="{ 'b-r ': !isExpanded, 'b-b': isExpanded }">
      <img :src="coupon.image" alt="" class="item-image" :class="{'m-a-auto': !isExpanded, 'm-y-small-3': isExpanded}">
      <div v-if="isExpanded" role="coupon-desc" class="text-description">{{ coupon.description }}</div>
    </div>
    <div class="coupon-inner f-column p-l-normal">
      <h5 class="discount-value text-dark fw-thick">
        <span class="m-r-small" v-if="coupon.discount.type === 'currency'">$</span>
        <span>{{ coupon.discount.amount }}</span>
        <span v-if="coupon.discount.type === 'percent'">%</span>
      </h5>
      <div class="discount-items text-dark">{{ coupon.category }}</div>
      <div class="date-expire text-description" >Expires {{ getDate }} ({{ getDetailDate }})</div>
      <div class="group f-coloumn m-y-small-2" v-if="isExpanded">
        <button class="btn btn-success">Apply</button>
        <button class="btn btn-error" @click.stop="deleteCoupon">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['coupon'],
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    isExpanded() {
      return this.expanded;
    },
    getDate() {
      return moment(new Date()).to(this.coupon.dateExp);
    },
    getDetailDate() {
      return moment(this.coupon.dateExp).format('MMM Do YYYY HH:mm')
    }
  },
  methods: {
    toggleCoupon() {
      this.expanded = !this.expanded;
    },
    deleteCoupon() {
      console.log("Deleted")
    }
  }
}
</script>

<style>

</style>
