<template>
  <div class="products__wrapper">
    <div class="products__container">
      <section class="products-block">
        <HeaderMobile v-if="mobileDevice"/>
        <Header v-else/>
        <div class="products__inner">
          <div class="title category-name">{{ getCurrentCategory }}</div>
          <div class="products__list" v-if="getProducts.length && !loadingData" :class="{ 'products__list_stretch' : detailsExpanded}">
            <Card v-for="productItem in displayedProducts"
                  :key="productItem.productID"
                  :product="productItem"
                  />
          </div>
          <LoadingSpinner v-else-if="loadingData"/>
          <div v-else class="products__list products__list_notification">
            <p class="notification notification_message empty-content_title">Nothing was found</p>
          </div>
        </div>
        <Pagination v-if="pages.length > 1"
          :pages="getPages"
          :page="page"
          @getPageNumber="togglePage"
        />
        <paginate
          v-if="pages.length > 1"
          :page-count="pages.length"
          :page-range="7"
          :margin-pages="1"
          :prev-text="'<'"
          :next-text="'>'"
          :prev-link-class="'custom-pagination_prev'"
          :next-link-class="'custom-pagination_next'"
          :active-class="'custom-pagination__link_active'"
          :page-class="'custom-pagination__link'"
          :container-class="'custom-paginate'"
          :click-handler="togglePage"
          >
        >
        </paginate>
      </section>
      <transition name="products-expand">
        <aside class="product-detail" v-if="detailsExpanded">
          <div class="product-detail__header">
            <h2>{{ $t('card_information_title') }}</h2>
            <button type="button" class="button" @click="closeDetailsCard">
              <img src="~@/assets/img/base/close.png" class="button__icon" alt="">
            </button>
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
import HeaderMobile from '@/components/Products/HeaderMobile.vue';
import Card from '@/components/Products/Card.vue';
import CardDetail from '@/components/Products/CardDetail.vue';
import Pagination from '@/components/Pagination.vue';

import Paginate from 'vuejs-paginate';

import { Product as ProductItem } from '@/types/store/products/state-types';
import { mapGetters } from 'vuex';
import { emptyDetailProduct } from '@/variables';
import { toggleDetails } from '@/helpers/useProducts';
import { Route } from 'vue-router';

export default Vue.extend({
  name: 'products-page',
  data() {
    return {
      currentCategory: {
        current: '',
        default: 'All'
      },
      loadingData: false,
      page: 1,
      perPage: 10,
      pages: [] as Array<number>
    }
  },
  methods: {
    closeDetailsCard() {
      return toggleDetails(true, emptyDetailProduct);
    },
    setPages() {
      this.pages.length = 0;

      let prodLength = this.getProducts.length;
      let numPages = Math.ceil(prodLength / this.perPage);
      console.log(prodLength, numPages);

      for(let index = 1; index <= numPages; index++) {
        this.pages.push(index);
      }
    },
    paginate() {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return this.getProducts.slice(from, to);
    },
    togglePage(value: number | 'previous' | 'next') {
      if(value === 'previous' && this.page > 1) {
        this.page--;
      } else if (value === 'next' && this.page < this.pages.length) {
        this.page++;
      } else {
        this.page = value as number;
      }
    },
    loadProducts(route: Route) {
      this.$load(async () => {
        this.loadingData = true
        const category = route.params.category ?? '';
        await this.$store.dispatch('fetchProducts', category);

        this.setPages();

        this.loadingData = false
      })
    }
  },
  computed: {
    ...mapGetters({
      detailsExpanded: 'getDetailsExpanded',
      getProductsCart: 'getProductsCart',
      getProducts: 'getProducts'
    }),
    mobileDevice() {
      return Vue.prototype.$isMobile;
    },
    getCurrentCategory(): string {
      const category = this.$route.params.category ?? 'All'
      return category.toUpperCase();
    },
    getPages(): Array<number> {
      return this.pages;
    },
    displayedProducts(): Array<ProductItem> {
      return this.paginate();
    }
  },
  components: {
    Header, HeaderMobile, Card, CardDetail, Pagination, Paginate,
    LoadingSpinner: () => import('@/components/LoadingSpinner.vue')
  },
  watch: {
    $route(to, from) {
      this.page = 1;

      this.loadProducts(to);
    }
  },
  mounted() {
    this.loadProducts(this.$route)
  },
})
</script>

<style>

.custom-paginate {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding-bottom: 20px;
}

.custom-pagination_next,
.custom-pagination_prev {
  font-size: 1.5em;
  transition: 0.2s all ease-out;
}

.custom-pagination_prev:hover,
.custom-pagination_next:hover {
  color: var(--secondary-orange);
}

.custom-pagination__link {
  margin: 0 4px;
  position: relative;
}

.custom-pagination__link:hover {
  color: var(--main-orange);
}

.custom-pagination__link_active {
  color: var(--main-blue);
}

.custom-pagination__link_active::before {
  display: block;
  content: '';
  position: absolute;
  top: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--main-blue);
}

.products__wrapper {
  background-color: var(--main-dark);
  flex: 1 1 auto;
  padding: 0 20px;
  height: 100vh;
  overflow: hidden;
}

.products__container {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
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
  position: relative;
  margin-top: 70px;
  min-height: 100%;
}

.categories-block {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  height: 44px;
  margin: 31px 1px 1px;
}

.categories-block__list {
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
  color: var(--main-white);
}

.products__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin-top: 30px;
  gap: 25px;
}

.products__list_stretch {
  /* justify-items: center; */
}

.products__list_stretch .product__cart {
  width: 100%;
}

.product-detail {
  top: 10px;
  position: sticky;
  min-width: 550px;
  height: calc(100% - 37px - 20px);
  transition: 0.5s all ease;
  margin-right: 0;
  margin-left: 25px;

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
.product-detail__header {
  display: flex;
  justify-content: space-between;
}

.product-detail__header h2 {
  text-align: left;
  font-size: 1.5em;
  line-height: 150%;
  font-weight: 600;
  color: var(--main-white);
}

/* Medias */
@media screen and (max-width: 1440px) {
  .product-detail {
    min-width: 350px;
  }
}


@media screen and (max-width: 980px) {
  .products__list {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media screen and (max-width: 850px) {

  .product-detail {
    min-width: 250px;
  }
}

@media screen and (max-width: 580px) {
  .products__wrapper {
    padding: 0 5px;
  }

  .products__inner {
    margin-top: 30px;
  }

  .products__list {
    width: 100%;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 5px;
  }
}

@media screen and (max-width: 680px) {
  .product-detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 0 5px;
    height: 100%;
    z-index: 10;
    background-color: var(--main-dark);
  }
}
</style>
