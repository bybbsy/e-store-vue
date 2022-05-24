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
  top: -16px;
  right: -10px;
  width: 30px;
  height: 30px;
  font-size: 0.7em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  /* border: 1px solid red; */
  z-index: 1;
}

.badge-info {
  color: var(--main-white)
}

.badge-orange {
  background-color: var(--secondary-orange);
}

@media screen and (max-width: 980px) {
  .badge-block {
    top: -12px;
    right: -6px;
    width: 25px;
    height: 25px;
    font-size: 0.7em;
  }
}

@media screen and (max-width: 480px) {
  .badge-block {
    top: -8px;
    right: -4px;
    width: 20px;
    height: 20px;
    font-size: 0.6em;
  }
}

</style>
