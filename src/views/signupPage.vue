<template>
  <div class="auth__body">
    <div class="auth__left">
      <div class="auth__container _container_left">

      </div>
    </div>
    <div class="auth__right">
      <div class="auth__container _container_right">
        <form class="auth__form">
          <div class="auth__header">
            <h5>Sign up</h5>
          </div>
          <div class="auth__content">
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-email" class="input__label">First name</label>
                <div class="input-block">
                  <input type="text" name="first-name" class="form__input form__input-name" id="first-name" placeholder="John">
                  <img src="~@/assets/form/form-name.png" alt="" class="input-img">
                </div>
              </div>
              <div class="field-block">
                <label for="sign-up-email" class="input__label">Last name</label>
                <div class="input-block">
                  <input type="text" name="last-name" class="form__input form__input-name" id="last-name" placeholder="Doe">
                  <img src="~@/assets/form/form-name.png" alt="" class="input-img">
                </div>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-email" class="input__label">E-mail</label>
                <div class="input-block">
                  <input type="email" name="e-mail" class="form__input form__input-email" id="sign-up-email" placeholder="johndoe@mail.ru">
                  <img src="~@/assets/form/form-email.png" alt="" class="input-img">
                </div>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-password" class="input__label">Password</label>
                <div class="input-block">
                  <input type="password" name="password" class="form__input form__input-password" id="sign-up-password" placeholder="********">
                  <img src="~@/assets/form/form-password.png" alt="" class="input-img">
                </div>
              </div>
              <div class="field-block">
                <label for="sign-up-password" class="input__label">Password</label>
                <div class="input-block">
                  <input type="password" name="password" class="form__input form__input-password" id="sign-up-password" placeholder="********">
                  <img src="~@/assets/form/form-password.png" alt="" class="input-img">
                </div>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit" value="Sign up" class="form__input form__input_sign-up">
          </div>
          <div class="auth__hint">
            <p class="hint__message">Already have an account? <router-link class="hint__link" :to="{name: 'sign-in'}">Sign in</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style>

</style>
