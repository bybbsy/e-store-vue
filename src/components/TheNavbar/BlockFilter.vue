<template>
    <!-- TODO Если пунктов больше чем 3, то при помощи v-show скрывать остальные.
        Добавить возможность скрыть и раскрыть список -->
    <div class="navbar__filters-block">

        <div class="filter-block" v-for="(filter, index) in filterItems" :key="index">
            <div class="filter-block__body" v-if="!filter.authRequired || userIsAuthorized">
                <div class="filter-block__main-filter">
                    <router-link :to="filter.baseUrl" class="main-filter__name">#{{ filter.mainCategory }}</router-link>
                </div>
                <ul class="filters-list">
                <router-link class="filter-element"
                    v-for="(category, categoryIndex) in filter.filterItems"
                    :key="categoryIndex"
                    :to=" { path: filter.baseUrl, query: { category: category.link}}"
                    >

                    <div class="filter-element__icon">
                        <img :src="require('@/assets/base/' + category.icon)" :alt="category.name">
                    </div>

                    <div class="filter-element__name">
                        <span>{{ category.name }}</span>
                    </div>
                </router-link>
            </ul>
            </div>
        </div>

        <!-- <div class="filter-block">
            <div class="filter-block__body">
                <div class="filter-block__main-filter">
                    <span class="main-filter__name">#Tienda</span>
                </div>
                <ul class="filters-list">
                    <div class="filter-element">
                        <div class="filter-element__icon">
                            <img src="~@/assets/base/Light-bulb.png" alt="">
                        </div>
                        <div class="filter-element__name">
                            <span>Juguetes</span>
                        </div>
                    </div>
                    <div class="filter-element">
                        <div class="filter-element__icon">
                            <img src="~@/assets/base/Heart.png" alt="">
                        </div>
                        <div class="filter-element__name">
                            <span>Salud</span>
                        </div>
                    </div>
                    <div class="filter-element">
                        <div class="filter-element__icon">
                            <img src="~@/assets/base/Apple.png" alt="">
                        </div>
                        <div class="filter-element__name">
                            <span>Salud</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div> -->

        <!-- <div class="filter-block">
            <div class="filter-block__body">
                <div class="filter-block__main-filter">
                    <span class="main-filter__name">#Personal</span>
                </div>
                <ul class="filters-list">
                    <div class="filter-element">
                        <div class="filter-element__icon">
                            <img src="~@/assets/base/Cart.png" alt="">
                        </div>
                        <div class="filter-element__name">
                            <span>Mi Carrito</span>
                        </div>
                    </div>
                    <div class="filter-element">
                        <div class="filter-element__icon">
                            <img src="~@/assets/base/Coupon.png" alt="">
                        </div>
                        <div class="filter-element__name">
                            <span>Cupones</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { filterBlock } from '@/types/filter/index';


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
                            link: 'Food'
                        }
                    ]
                },
                {
                    mainCategory: 'personal',
                    baseUrl: '',
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
        userIsAuthorized(): (string | boolean) {
            return localStorage.getItem('username') ?? false;
        }
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
    color: #FFA049;
    text-align: left;
    cursor: pointer;
}

.filters-list {

}

.filter-element {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 20px 0 0;
}

.filter-element:hover .filter-element__icon {
    background-color: #FD7A32;
}

.filter-element:hover .filter-element__name span {
    color: #fff;
}

.filter-element__icon {
    position: relative;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.15);
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
    color: rgba(255, 255, 255, 0.4);
    transition: 0.1s all ease-in;
}

</style>
