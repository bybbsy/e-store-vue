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
* {
  padding: 0;
  margin: 0;
  border: 0;

}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 16px;
  font-family: 'Poppins', serif;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;


}
nav,
input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}
button {
  cursor: pointer;
}
button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
a,
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
ul li {
  list-style: none;
}
img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}

:root {
  --main-dark: #1B1A1D;
  --secondary-dark: #28272B;
  --secondary-gray: rgba(255, 255, 255, 0.15);
  --text-gray: rgba(255, 255, 255, 0.4);
  --text-gray-disabled: rgba(44, 44, 44, 0.397);
  --main-orange: #FFA049;
  --secondary-orange: #FD7A32;
  --button-orange: #ffbf49;
  --main-white: #fff;
  --secondary-white: #F4F2F2;
  --main-success: #5DBF79;
  --secondary-success: #8ccc9e;
  --main-error: rgb(243, 38, 38);
  --secondary-error: rgb(223, 53, 53);
  --main-blue: #485fe2;
  --secondary-blue: #485fe2;
  --main-purple: #323036;
  --dark-blue: #17273fde;
  --darker-blue: #46444B;
  --main-orange-disabled: rgba(240,171,32, 0.2);
  --dark-error-page: #0A0B16;
  --text-description: rgba(0, 0, 0, 0.4);
}

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

.button {
  display: inline-block;
  background: transparent;
}
</style>
