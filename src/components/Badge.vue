<template>
  <div class="badge-block">
    <span class="badge-info"></span>
  </div>
</template>

<script>
export default {
  props: [],

}
</script>

<style>
.badge-block {
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
}

.badge-info {
  color: var(--main-white)
}

.badge-orange {
  background-color: var(--main-orange);
}

</style>
