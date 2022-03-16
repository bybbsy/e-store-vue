<template>
 <div class="left__content">
   <div class="left__image">
      <img src="~@/assets/img/base/Welcome.png" alt="Welcome image">
    </div>
    <div class="left__welcome-text">
      <h2 class="title ">{{ title }}</h2>
      <p class="welcome-text__description">{{ description }}</p>
      <p class="welcome-text__description welcome-text__description_orange">or</p>
      <p class="hint__message hint__message_white">Go to the <router-link :to="{ name: 'products'}" class="hint__link">main page</router-link> </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'auth-welcome',
  props: [
    'title',
    'description'
  ]
})
</script>
