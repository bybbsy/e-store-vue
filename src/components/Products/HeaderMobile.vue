<template>
  <header class="products-header products-header_mobile">
    <div class="menu-toggler">
      <button type="button" class="btn btn__bars" @click="toggleMenu">
        <!-- {{ menuState }} -->
        <font-awesome-icon icon="fa-solid fa-bars" class="toggle-menu__icon"/>
      </button>
    </div>
    <Input />
    <div class="header__navbar">
      <router-link class="navbar__item" :to="{name: 'home'}">
        <div class="navbar__icon">
          <img src="~@/assets/img/base/Bell.png" alt="Notifications">
        </div>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from '../SearchInput.vue';

export default Vue.extend({
  name: 'products-header',
  components: {
    Input
  },
  methods: {
    toggleMenu() {
      console.log('fuck')
    }
  }
})
</script>

<style>


.menu-toggler {
  width: 30px;
  height: 30px;
  margin-right: 35px;
}

.btn__bars {
  width: 100%;
  height: 100%;
  color: var(--main-white);
  background-color: transparent;
  font-size: 1.5em;
}


.btn__bars_active {
  color: var(--main-orange);
}

.btn__bars:hover {
  color: var(--main-orange);
}
</style>
