<template>
  <div class="auth__body">
    <div class="auth__left">
      <div class="auth__container _container_left">
        <div class="left__content">
          <div class="left__image">
            <img src="~@/assets/img/base/Welcome.png" alt="Welcome image">
          </div>
          <div class="left__welcome-text">
            <h2 class="title ">Welcome back</h2>
            <p class="welcome-text__description">Just a couple of clicks and we get started</p>
            <p class="welcome-text__description welcome-text__description_orange">or</p>
            <p class="hint__message hint__message_white">Go to the <router-link :to="{ name: 'Products'}" class="hint__link">main page</router-link> </p>
          </div>
        </div>
      </div>
    </div>
    <div class="auth__right">
      <div class="auth__container _container_right">
        <form class="auth__form" @submit.prevent="submitHandler">
          <div class="auth__header">
            <h5>{{ $t('sign_in_title') }}</h5>
          </div>
          <div class="auth__content">
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-in-email" class="input__label">{{ $t('email') }}</label>
                <div class="input-block">
                  <input type="email"
                         name="e-mail"
                         class="form__input form__input-email"
                         id="sign-in-email"
                         placeholder="John"
                         @blur="$v.userEmail.$touch()"
                         v-model.trim="userEmail"
                         >
                  <img src="~@/assets/img/form/form-email.png" alt="" class="input-img">
                  <span class="input-block__error" v-if="emailIsInvalid">{{ $t('invalid_field') }}</span>
                </div>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-in-password" class="input__label">{{ $t('password') }}</label>
                <div class="input-block">
                  <input type="password"
                         name="password"
                         class="form__input form__input-password"
                         id="sign-in-password"
                         placeholder="********"
                         @blur="$v.userPassword.$touch()"
                         v-model.trim="userPassword"
                         >
                  <img src="~@/assets/img/form/form-password.png" alt="" class="input-img">
                  <span class="input-block__error" v-if="$v.userPassword.$dirty">{{ $t('invalid_field') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit"
                   :disabled="emailIsInvalid || passwordIsInvalid"
                   :value="$t('sign_in_button')"
                   class="form__input form__input_sign-in"
                   >
          </div>
          <div class="auth__hint">
            <p class="hint__message">{{ $t('dont_have_an_accound') }}<router-link class="hint__link" :to="{name: 'sign-up'}">{{ $t('sign_up_title') }}</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from '@/types/store/auth/state-types';
import { email, required, minLength } from 'vuelidate/lib/validators';

import Vue from 'vue';
import { faL } from '@fortawesome/free-solid-svg-icons';

export default Vue.extend({
  data() {
    return {
      userEmail: '',
      userPassword: ''
    }
  },
  validations: {
    userEmail: {
      required,
      email,
      minLength: minLength(6)
    },
    userPassword: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    emailIsInvalid() {
      if(this.$v.userEmail.$dirty) {
        return this.$v.userEmail.$invalid;
      }
      return false;
    },
    passwordIsInvalid() {
      if(this.$v.userPassword.$dirty) {
        return this.$v.userPassword.$invalid;
      }
      return false;
    }
  },
  methods: {
    async submitHandler() {
      let formData: User =  {
        email: this.userEmail,
        password: this.userPassword
      }

      this.$load(async () => {
        await this.$store.dispatch('LOGIN', formData);
        await this.$router.push('/products')
      })

    }
  }
})
</script>

<style>
.input-block__error {
  line-height: 150%;
  color: var(--main-error);
}
</style>
