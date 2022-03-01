<template>
  <router-link class="filter-element" :to=" { path: `/${filter.baseUrl}/${category.link}`}">
    <div class="filter-element__icon">
        <Badge v-if="filter.mainCategory === 'personal' && category.link === 'cart'" :value="len"/>
        <img :src="require('@/assets/img/base/' + category.icon)" :alt="category.name">
    </div>

    <div class="filter-element__name">
        <span>{{ category.link }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Badge from '@/components/Badge.vue';
import { PropType } from 'vue';
import { CartProduct } from '@/types/store/products/state-types';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'block-category',
  props: ['filter', 'category'],
  data() {
    return {
      products: Array as PropType<Array<CartProduct>>
    }
  },
  computed: {
    ...mapGetters(['getProductsCartLength']),
    len() {
      return this.getProductsCartLength;
    }
  },
  components: {
    Badge
  }
})
</script>

<style>

</style>
