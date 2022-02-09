<template>
  <div class="block-rating">
    <span v-for="rate of maxRating"
          :key="rate"
          :style="{ background: getRating(rate) }"
          ></span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      maxRating: 5,
      userRating: 2.5
    }
  },
  methods: {
    getRating(rate: number): string {
      if(this.userRating - (rate-1) < 1 && this.userRating - (rate - 1) > 0) {
        // Computed value
        let value = (this.userRating - (rate - 1)) * 100;

        // Returns gradient
        return `linear-gradient(to right, #FFA049 ${value}%, lightgrey ${value}%)`;

      } else if (this.userRating - (rate - 1) > 1) {
        return '#FFA049';
      }
      else {
        return 'lightgray';
      }
    }
  }
})
</script>

<style>
.block-rating {
  display: flex;
  margin-left: -3px;
}

.block-rating span {
  display: block;
  position: relative;
  mask-image: url('~@/assets/img/base/Star.svg');
  mask-repeat: no-repeat;
  mask-position: center center;
  width: 20px;
  height: 20px;
}

</style>
