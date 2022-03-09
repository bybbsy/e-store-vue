<template>
  <div class="coupon theme-white" :class="{ 'pos-horizontal': !isExpanded, 'pos-vertical': isExpanded }" @click="toggleCoupon">
    <div class="coupon-inner b-dashed b-light-gray" :class="{ 'b-r ': !isExpanded, 'b-b': isExpanded }">
      <img v-if="!isExpanded" src="~@/assets/img/mock/Item1.png" alt="" class="item-image">
      <div v-else class="text-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa possimus, corrupti rem corporis id vero? Vitae amet cum corrupti officia expedita! Cum, nam saepe! Neque sint minus voluptatibus odit sit.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quas ea, provident nemo quasi cupiditate numquam voluptatum fuga ex cum sunt et saepe expedita facere consectetur nihil perferendis adipisci! Quae!
        Lturi non placeat, beatae alias provident quod eaque voluptas odit. Odio natus nulla dignissimos minima iste, libero sequi commodi.

      </div>
    </div>
    <div class="coupon-inner f-column p-l-normal">
      <h5 class="discount-value text-dark fw-thick">
        <span class="m-r-small">$</span>
        <span>1000</span>
      </h5>
      <div class="discount-items text-dark">Toys</div>
      <div class="date-expire text-description" >Valid until 01 febrary</div>
      <div class="group f-coloumn m-y-small-2" v-if="isExpanded">
        <button class="btn btn-success">Apply</button>
        <button class="btn btn-error" @click.stop="deleteCoupon">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expanded: false
    }
  },
  computed: {
    isExpanded() {
      return this.expanded;
    }
  },
  methods: {
    toggleCoupon() {
      this.expanded = !this.expanded;
    },
    deleteCoupon() {
      alert("Deleted")
    }
  }
}
</script>

<style>

</style>
