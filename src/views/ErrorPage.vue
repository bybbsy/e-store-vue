<template>
  <div>
    <error-canvas/>
  </div>
</template>

<script>

export default {
  name: "error-page",
  components: {
    ErrorCanvas: () => import('@/components/Error/ErrorCanvas.vue')
  }
}
</script>

<style>

</style>
