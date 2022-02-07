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
          <div class="products__list" >
            <Card v-for="card of 9"
                  :key="card"
                  :class="{ 'product__card_expanded': detailsExpanded}"
                  :detailsExpanded="detailsExpanded"
                  @toggle-details="handleClick"
                  />
          </div>
        </div>
      </section>
        <transition name="products-expand">
          <aside class="product-detail" v-if="detailsExpanded">
            <div class="product-detail__header">
              <h2>Información del Juguete</h2>
            </div>
            <CardDetail />
          </aside>
        </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Products/Header.vue';
import Category from '@/components/Products/Category.vue';
import Card from '@/components/Products/Card.vue';
import CardDetail from '@/components/Products/CardDetail.vue';

export default Vue.extend({
  name: 'products-page',
  data() {
    return {
      detailsExpanded: false
    }
  },
  components: {
    Header, Category, Card, CardDetail
  },
  methods: {
    handleClick(data: boolean) {
      this.detailsExpanded = data;
    }
  }
})
</script>

<style>
.products__wrapper {
  background-color: #1B1A1D;
  flex: 1 1 auto;
  padding: 0 20px;
  height: 100vh;
  overflow: hidden;
}

.products__container {
  width: 100%;
  display: flex;
  /* border: 1px solid tomato; */
  height: 100%;
  overflow: hidden scroll;
  scrollbar-width: none;
}

.products__container::-webkit-scrollbar {
  display: none;
}

.products-block {
  padding-top: 25px;
  height: 100%;
  flex: 1 1 auto;
}

.products__inner {
  margin-top: 70px;
  height: 100%;
}

.categories-block {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  height: 44px;
  margin: 31px 1px 1px;
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

.products__list {
  display: flex;
  flex: 1 1 auto;
  flex-flow: row wrap;
  margin-top: 30px;
  gap: 25px;
}

.product-detail {
  top: 10px;
  position: sticky;
  min-width: 550px;
  height: calc(100% - 37px - 20px);
  transition: 0.5s all ease;
  margin-right: 0;
  margin-left: 25px;
  /* margin-right: -550px; */

}

.product-detail__expanded {
  transition: 0.5s all ease;
  margin-right: 0;

}

/* Animations */

.products-expand-enter-active {
  animation: bounce .3s;
}
.products-expand-leave-active {
  /* transition: 0.5s all ease; */
  animation: bounce .3s reverse;
}


.products-expand-enter,
.products-expand-leave-to {
  opacity: 0;
  /* margin-right: -550px; */
}

@keyframes bounce {
  0% {
    margin-right: 0;
  }
  50% {
    margin-right: 20px;
  }
  100% {
    margin-right: 0;
  }
}

.product-detail__header h2 {
  text-align: left;
  font-size: 1.5em;
  line-height: 150%;
  font-weight: 600;
  color: #fff;
}
</style>
