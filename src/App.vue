<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'

import {isMobile} from "@/helpers/useDetectDevice";
export default Vue.extend({
  name: 'App',
  computed: {
    layout() {
      return (this.$route.meta?.layout ?? 'empty') + '-layout'
    }
  },
  mounted() {
    Vue.prototype.$isMobile = isMobile();
  },
  components: {
    DefaultLayout, EmptyLayout
  }
})
</script>

<style>
@import '~@/assets/css/BEM/index.css';

#app {
  display: flex;
  width: 100%;
  min-height: 100%;
}

.title {
  font-size: 1.5em;
  color: var(--main-white);
  font-weight: 600;
  line-height: 150%;
}

.price {
  color: var(--main-white);
  font-weight: 500;
  font-size: 1.875em;
  line-height: 150%;
}

.card__bottom {
  display: flex;
}

._hide-scroll {
  scrollbar-width: none;
}

._hide-scroll::-webkit-scrollbar {
  display: none;
}

.wrapper--cover {
  flex: 1 1 auto;
  height: 100vh;
  overflow: scroll;
}

.wrapper--dark {
  background-color: var(--main-dark);
}

.text-center {
  text-align: center;
}

.button {
  display: inline-block;
  background: transparent;
}

.input-block__error {
  line-height: 150%;
  color: var(--main-error);
}
</style>
