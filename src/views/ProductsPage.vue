<template>
  <div class="products__wrapper">
    <div class="products__container">
      <section class="products-block">
        <Header />
        <Category />
      </section>
      <aside class="product-detail">

      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Products/Header.vue';
import Category from '@/components/Products/Category.vue';

export default Vue.extend({
  name: 'products-page',
  components: {
    Header, Category
  }
})
</script>

<style>
.products__wrapper {
  background-color: #1B1A1D;
  flex: 1 1 auto;
  padding: 0 20px;
  overflow: hidden;
}

.products__container {
  width: 100%;
  border: 1px solid tomato;
  height: 100%;
}

.products-block {
  padding-top: 25px;
}
</style>