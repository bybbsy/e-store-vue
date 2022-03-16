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
                         @focus="$v.userEmail.$touch()"
                         v-model.trim="userEmail"
                         >
                  <img src="~@/assets/img/form/form-email.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="emailIsInvalid.invalid">{{ $t(emailIsInvalid.errorMessage, { minLength: emailIsInvalid.params.minLength }) }}</span>
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
                         @focus="$v.userPassword.$touch()"
                         v-model.trim="userPassword"
                         >
                  <img src="~@/assets/img/form/form-password.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="passwordIsInvalid.invalid">{{ $t(passwordIsInvalid.errorMessage, { minLength: passwordIsInvalid.params.minLength }) }}</span>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit"
                   :disabled="emailIsInvalid.invalid || passwordIsInvalid.invalid"
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
import { email, required, minLength, decimal } from 'vuelidate/lib/validators';
import Vue from 'vue';
import { emptyEmail, emptyPassword, signinFormOptions } from '@/variables';
import { validateEmail, validatePassword } from '@/helpers/auth';
import { InputError } from '@/types/auth';
import _ from 'lodash';




export default Vue.extend({
  data() {
    return {
      userEmail: '',
      userPassword: '',
      number: '',
      emailValid: emptyEmail,
      passwordValid: emptyPassword
    }
  },
  validations: {
    number: {
      decimal
    },
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
    emailIsInvalid(): InputError {
      return this.emailValid;
      // return validateEmail(this.$v, signinFormOptions);
    },
    passwordIsInvalid(): InputError {
      return this.passwordValid;
      // return validatePassword(this.$v, signinFormOptions);
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
  },
  mounted() {
    this.emailValid = validateEmail(this.$v, signinFormOptions);
    this.passwordValid = validatePassword(this.$v, signinFormOptions);
  },
  watch: {
    userEmail: _.debounce(function(this: any) {
      this.emailValid = validateEmail(this.$v, signinFormOptions);
    }, 1000),
    userPassword: _.debounce(function(this: any) {
      this.passwordValid = validatePassword(this.$v, signinFormOptions);
      console.log(this.userPassword)
    }, 1000)
  }
})
</script>

<style>
.input-block__error {
  line-height: 150%;
  color: var(--main-error);
}
</style>
