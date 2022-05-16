<template>
    <!-- TODO Если пунктов больше чем 3, то при помощи v-show скрывать остальные.
        Добавить возможность скрыть и раскрыть список -->
    <div class="navbar__filters-block">
        <div class="filter-block" v-for="(filter, index) in filterItems" :key="index">
            <div class="filter-block__body" v-if="!filter.authRequired || (filter.authRequired && uid)">
                <div class="filter-block__main-filter">
                    <router-link :to="{ path: `/${filter.baseUrl}` }" class="filter-element main-filter__name">#{{ filter.mainCategory }}</router-link>
                </div>
                <ul class="filters-list">
                  <BlockCategory
                    v-for="(category, categoryIndex) in filter.filterItems"
                    :key="categoryIndex"
                    :filter="filter"
                    :category="category"
                  />
            </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { filterBlock } from '@/types/filter/index';
import { userIsAuthorized } from '@/helpers/auth'
import BlockCategory from './BlockCategory.vue';

export default Vue.extend({
  name: 'block-filter',
  data() {
    return {
      filterItems: [
        {
          mainCategory: 'store',
          baseUrl: 'products',
          authRequired: false,
          filterItems: [
            {
                name: 'Toys',
                icon: 'Light-bulb.png',
                link: 'toys'
            },
            {
                name: 'Health',
                icon: 'Heart.png',
                link: 'health'
            },
            {
                name: 'Food',
                icon: 'Apple.png',
                link: 'food'
            }
          ]
        },
        {
          mainCategory: 'personal',
          baseUrl: 'personal',
          authRequired: true,
          filterItems: [
            {
                name: 'My cart',
                icon: 'Cart.png',
                link: 'cart'
            },
            {
                name: 'Coupons',
                icon: 'Coupon.png',
                link: 'coupons'
            }
          ]
        }
      ] as Array<filterBlock>
    }
  },
  computed: {
    uid() {
      return userIsAuthorized();
    }
  },
  components: {
    BlockCategory
  }
})
</script>

<style>
.filter-block {
    width: 100%;
    margin: 0 0 45px;
    font-size: 1.125em;
}

.filter-block__main-filter {
    text-transform: uppercase;
    letter-spacing: 0.15em;
}

.main-filter__name {
    color: var(--main-orange);
    text-align: left;
    cursor: pointer;
}

.filter-element {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 20px 0 0;
}

.filter-element:hover .filter-element__icon {
    background-color: var(--secondary-orange);
}

.filter-element:hover .filter-element__name span {
    color: var(--main-white);
}

.filter-element__icon {
    position: relative;
    width: 50px;
    height: 50px;
    background-color: var(--secondary-gray);
    border-radius: 50%;
    margin-right: 30px;
    transition: 0.1s all ease-in;
}

.filter-element__icon img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 30px;
    max-height: 30px;
    object-fit: contain;
}

.filter-element__name span {
    color: var(--text-gray);
    transition: 0.1s all ease-in;
}

.filter-element.router-link-exact-active .filter-element__name span {
  color: var(--main-orange);
}
.filter-element.router-link-exact-active .filter-element__icon {
  background-color: var(--main-orange);
}

/* @media screen and (max-width: 950px) {
  .filter-block {
    font-size: 1.1em;
  }

  .filter-element__icon {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }

  .filter-element__icon img {
    max-width: 15px;
    max-height: 15px;
  }
} */


@media screen and (max-width: 1080px) {
  .filter-block {
    font-size: 1em;
  }

  .filter-element__icon {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }

  .filter-element__icon img {
    max-width: 15px;
    max-height: 15px;
  }
}

@media screen and (max-width: 450px) {
  .filter-block {
    font-size: 0.9em;
  }

  .filter-element__icon {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }

  .filter-element__icon img {
    max-width: 15px;
    max-height: 15px;
  }
}
</style>
