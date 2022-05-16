<template>
  <div class="block-rating">
    <span v-for="(rate, index) in setRating"
      :key="index"
      :style="{ background: rate.style }"
    >
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash';

export default Vue.extend({
  props: ['rate'],
  data() {
    return {
      maxRating: 5,
      userRating: this.rate
    }
  },
  computed: {
    setRating(): any {

      let res = _.range(1, this.maxRating + 1).map((rate) => {
        if(this.userRating - (rate-1) < 1 && this.userRating - (rate - 1) > 0) {
          // Computed value
          let value = (this.userRating - (rate - 1)) * 100;

          // Returns gradient
          return { style: `linear-gradient(to right, var(--main-orange) ${value}%, lightgrey ${value}%)` };

        } else if (this.userRating - (rate - 1) >= 1) {
          return { style: 'var(--main-orange)' };
        }
        else {
          return { style: 'lightgray' };
        }
      })
      return res;
    }
  },
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

@media screen and (max-width: 580px) {
  .block-rating {
    margin-left: 0;
  }

  .block-rating span {
    width: 12px;
    height: 12px;
    mask-size: 12px;
  }
}

</style>
