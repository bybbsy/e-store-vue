<template>
  <div class="products__wrapper">
    <div class="products__container">
      <section class="products-block">
        <Header />
        <div class="products__inner">
          <div class="title category-name">Toys</div>
          <div class="categories-block">
            <ul class="categrories-block__list">
              <Category />
              <Category />
              <Category />
            </ul>
            <div class="categories-block__button">
              <button class="button categories-scroll-button">VER MÁS</button>
              <div class="button__icon">
                <img src="~@/assets/base/ArrowRight.png" alt="">
              </div>
            </div>
          </div>
        </div>
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
  /* border: 1px solid tomato; */
  height: 100%;
}

.products-block {
  padding-top: 25px;
}

.products__inner {
  margin-top: 70px;
}

.categories-block {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  height: 44px;
  margin-top: 30px;
}

.categrories-block__list {
  display: flex;
  height: 100%;
  padding: 1px;
}

.categories-block__button {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
}

.button__icon {
  display: flex;
  width: 25px;
  height: 25px;
}

.button__icon img {
  margin: auto;
  object-fit: contain;
}

.categories-scroll-button {
  background-color: transparent;
  line-height: 150%;
  text-decoration-line: underline;
  text-transform: uppercase;
  font-size: 1em;
  color: #fff;
  /* font-weight: 4; */
}
</style>