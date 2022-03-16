<template>
  <div class="coupon themeWhite" :class="{ 'posHorizontal': !isExpanded, 'posVertical': isExpanded }" @click="toggleCoupon">
    <div class="couponInner flexColumn borderDashed borderLightGray" :class="{ 'borderRight ': !isExpanded, 'borderBottom': isExpanded }">
      <img :src="coupon.image" alt="" class="item-image" :class="{'marginAllAuto': !isExpanded, 'marginYSmall3 ': isExpanded}">
      <div v-if="isExpanded" role="coupon-desc" class="text-description">{{ coupon.description }}</div>
    </div>
    <div class="couponInner flexColumn paddingLeftNormal">
      <h5 class="discountValue textDark fontWeightThick">
        <span class="marginRightSmall1" v-if="coupon.discount.type === 'currency'">$</span>
        <span>{{ coupon.discount.amount }}</span>
        <span v-if="coupon.discount.type === 'percent'">%</span>
      </h5>
      <div class="discountTarget textDark">{{ coupon.category }}</div>
      <div class="dateExpire textLightGray" >Expires {{ getDate }} ({{ getDetailDate }})</div>
      <div class="group marginRightSmall2" v-if="isExpanded">
        <button class="button buttonSuccess">Apply</button>
        <button class="button buttonError" @click.stop="deleteCoupon">Delete</button>
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
