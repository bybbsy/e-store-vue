<template>
  <div v-if="value" class="badge-block badge-orange">
    <span class="badge-info">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style>
.badge-block {
  position: absolute;
  top: -12px;
  right: -6px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.badge-info {
  color: var(--main-white)
}

.badge-orange {
  background-color: var(--main-orange);
}

</style>
