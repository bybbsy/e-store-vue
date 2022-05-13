<template>
  <v-app>
    <div class="personal__wrapper wrapper--cover wrapper--dark _hide-scroll">
      <div class="personal__container">
        <router-view/>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

})
</script>

<style>
.personal__container {
  height: 100%;
  padding: 20px;
}
</style>
