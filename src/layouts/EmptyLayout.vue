<template>
  <div class="empty__wrapper">
    <router-view class="wrapper__container"/>
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

.wrapper__container {
  width: 100%;
}

.auth__body {
  display: flex;
  width: 100%;
}

.auth__container {
  display: flex;
  height: 100%;
}

._container_left {
  margin: 0 25px;
}

._container_right {
  margin: 0 25px 0 120px;
}

.auth__left {
  width: 50%;
  background-color: var(--main-purple);
}


.left__content {
  display: flex;
  flex-direction: column;
  margin: 0 auto 0 auto;
  justify-content: center;
  align-items: center;
}

.left__image {
  margin-right: -65px;
}

.left__welcome-text {
  margin-top: 50px;
  text-align: center;
}

.welcome-text__description {
  line-height: 150%;
  color: var(--main-white);
}

.welcome-text__description {
  margin: 10px 0;
}

.welcome-text__description_orange {
  color: var(--main-orange);
}

.auth__right {
  width: 50%;
  background-color: var(--text-gray);
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
  background-color: var(--secondary-white);
  min-height: 52px;
  font-size: 1em;
  color: var(--dark-blue);
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
  background-color: var(--main-orange);
  height: 50px;
  font-weight: 500;
  font-size: 1.125em;
  cursor: pointer;
  transition: 0.5s all ease;
}

input[type=submit]:disabled:hover,
input[type=submit]:disabled{
  background-color: var(--main-orange-disabled);
  color: var(--text-gray-disabled);
  cursor: initial;
}

.form__input_sign-in:hover,
.form__input_sign-up:hover {
  background-color: var(--main-success);
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

.hint__message_white {
  color: var(--main-white);
}


.hint__link {
  margin-left: 5px;
  color: var(--main-orange);
}

@media screen and (max-width: 1400px) {
  ._container_left {
    margin-right: 200px;
  }
}

@media screen and (max-width: 1250px) {
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
