<template>
  <div class="snackbar-wrapper" :class="{ expanded: open }">
    <div class="snackbar-container">
      <div class="snackbar__message">
        <p></p>
      </div>
      <div class="snackbar__actions">
        <button class="button button__close-snackbar" @click="closeSnackbar">close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'snackbar',
  data() {
    return {
      open: false
    }
  },
  methods: {
    closeSnackbar() {
      this.open = !this.open;
    }
  }
})
</script>

<style>
.snackbar-wrapper {
  position: absolute;
  left: 50%;
  bottom: -100%;
  transform: translateX(-50%);
  background-color: var(--main-orange);
  max-width: 350px;
  padding: 10px;
  transition: 1s all ease;
  border-radius: 5px;
}

.snackbar-wrapper.expanded {
  bottom: 25px;
  transition: 0.5s all ease;
}

.snackbar-container {
  display: flex;
  align-items: center;
}

.snackbar__message {
  color: var(--main-white);
  line-height: 150%;
}

.snackbar__actions {

}

.button.button__close-snackbar {
  height: 35px;
  color: var(--main-error);
  border-radius: 2px;
  padding: 5px;
  transition: 0.2s all ease;
}

.button.button__close-snackbar:hover {
  background-color: rgba(255, 0, 0, 0.25);
  transition: 0.2s all ease;
}
</style>
