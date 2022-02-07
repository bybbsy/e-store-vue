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
            <h5>Sign in</h5>
          </div>
          <div class="auth__content">
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-in-email" class="input__label">E-mail</label>
                <div class="input-block">
                  <input type="email" name="e-mail" class="form__input form__input-email" id="sign-in-email" placeholder="John">
                  <img src="~@/assets/form/form-email.png" alt="" class="input-img">
                </div>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-in-password" class="input__label">Password</label>
                <div class="input-block">
                  <input type="password" name="password" class="form__input form__input-password" id="sign-in-password" placeholder="********">
                  <img src="~@/assets/form/form-password.png" alt="" class="input-img">
                </div>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit" value="Sign in" class="form__input form__input_sign-in">
          </div>
          <div class="auth__hint">
            <p class="hint__message">Don't have an account? <router-link class="hint__link" :to="{name: 'sign-up'}">Sign up</router-link></p>
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
