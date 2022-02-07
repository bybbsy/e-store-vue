<template>
    <div class="empty__wrapper">
        <router-view/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'empty-layout'
})
</script>

<style>
.empty__wrapper {
  display: flex;
  flex: 1 1 auto;
}

.auth__body {
  display: flex;
  width: 100%;
}

.auth__container {
  display: flex;
  width: 720px;
  height: 100%;
}
._container_left {
  margin: 0 120px 0 auto;
  border: 1px solid tomato;
}

._container_right {
  margin: 0 auto 0 120px;
}

.auth__left {
  width: 50%;
  background-color: #28272B;
}

.auth__right {
  width: 50%;
  background-color: rgba(255, 255, 255, 0.4);
}

.auth__form {
  display: flex;
  flex-direction: column;
  width: 465px;
  margin: auto auto auto 0;
}

.auth__header {
  font-size: 3em;
  line-height: 150%;
}

.auth__header * {
  font-weight: 600;
}

.auth__content {
  display: flex;
  flex-direction: column;
}

.auth__row {
  margin: 10px 0;
  display: flex;
  flex: 1 1 auto;
}

.field-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.field-block:nth-child(2) {
  margin-left: 20px;
}

.input__label {
  line-height: 150%;
}

.input-block {
  position: relative;
}

.form__input {
  width: 100%;
  border-radius: 6px;
}

.form__input-email,
.form__input-password,
.form__input-name {
  background-color: #F4F2F2;
  min-height: 52px;
  font-size: 1em;
  color: #17273fde;
  padding: 12px 45px 12px 12px;
}

.form__input-password + .input-img {
  cursor: pointer;
}

.input-img {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 25px;
}

.auth__control {
  margin-top: 50px;
}

.form__input_sign-in,
.form__input_sign-up {
  background-color: #F0AB20;
  height: 50px;
  font-weight: 500;
  font-size: 1.125em;
  cursor: pointer;
  transition: 0.5s all ease;
}

.form__input_sign-in:hover,
.form__input_sign-up:hover {
  background-color: #5dbf79;
}

.auth__hint {
  display: flex;
  margin-top: 15px;
  font-size: 1.125em;
  line-height: 150%;
}

.hint__message {
  display: inline-block;
  margin: 0 auto;
  color: #312E81CC;
}

.hint__link {
  margin-left: 5px;
  color: #F0AB20;
}

@media screen and (max-width: 1020px) {
  .auth__left {
    display: none;
  }

  ._container_right {
    margin: 0 auto;
    width: 100%;
  }
  .auth__right {
    width: 100%;
  }

  .auth__form {
    margin: auto;
  }
}

@media screen and (max-width: 500px) {
  .auth__form {
    width: 100%;
    margin: auto 25px;
  }

  .auth__header {
    font-size: 2em;
  }

  .auth__row {
    flex-direction: column;
  }

  .field-block:nth-child(2) {
    margin: 5px 0;
  }
}
</style>
