<template>
  <div class="card__button">
    <div class="button__text">{{ buttonText }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'base-button',
  props: {
    buttonText: {
      type: String,
      required: true,
      default: 'no-text'
    }
  }
})
</script>

<style>
.card__button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 50px;
  border-radius: 25px;
  padding: 10px 18px 10px 50px;
}

.card__button_add {
  background-color: var(--main-orange);
  background-image: url('~@/assets/img/base/PlusCircle.png');
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: 18px 50%;
  color: var(--main-white);
  transition: 0.2s all ease;
}

.card__button_remove {
  background-color: var(--secondary-error);
  background-image: url('~@/assets/img/base/recycle-bin.png');
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 15px 50%;
  color: var(--main-white);
  transition: 0.2s all ease;
}

.card__button_remove:hover {
  background-color: var(--main-error);
}

.card__button_add:hover {
  background-color: var(--button-orange);
}

.button__text {
  width: 100%;
  text-align: right;
  font-size: 1.125em;
  font-weight: 500;
  line-height: 150%;
}


@media screen and (max-width: 980px) {
  .card__button {
    min-width: 150px;
    min-height: 40px;
    padding: 7px 15px 7px 45px;
  }

  .card__button_add {
    background-position: 15px 7px;
    background-size: 25px 25px;
  }
}
</style>
