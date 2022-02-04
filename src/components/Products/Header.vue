<template>
  <header class="products-block__header">
      <Input />
      <div class="header__navbar">
          <router-link class="navbar__item" :to="{name: 'home'}">
              <div class="navbar__icon">
                  <img src="~@/assets/base/Bell.png" alt="Notifications">
              </div>
          </router-link>
      </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from './Input.vue';

export default Vue.extend({
    name: 'products-header',
    components: {
        Input
    }
})
</script>
<style>
.products-block__header {
    display: flex;
    align-items: center;
}

.header__navbar {
    display: flex;
    margin-left: 35px;
}

.navbar__item {
    width: 30px;
    height: 30px;
    margin: 0 5px;
}

.navbar__icon {
    width: 100%;
    height: 100%;
}

.navbar__icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>