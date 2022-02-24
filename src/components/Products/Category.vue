<template>
  <div class="category-block">
    <div class="category-wrapper">
      <div class="category-name">Small toys</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style>
.category-block {
  display: inline-flex;
}

.category-block:not(:first-child) {
  margin-left: 15px;
}

.category-wrapper {
  position: relative;
  background-color: transparent;
  border: 1px solid var(--darker-blue);
  color: var(--darker-blue);
  padding: 10px 20px;
  line-height: 150%;
  border-radius: 50px;
  transition: 0.1s all ease-in-out;
  cursor: pointer;
  margin: -1px;
}

.category-wrapper:hover,
.category-wrapper:active {
  margin: -2px;
  border: 2px solid var(--main-white);
  color: var(--main-white);
}
</style>
