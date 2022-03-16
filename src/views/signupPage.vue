<template>
  <div class="auth__body">
    <div class="auth__left">
      <div class="auth__container _container_left">
        <div class="left__content">
          <div class="left__image">
            <img src="~@/assets/img/base/Welcome.png" alt="Welcome image">
          </div>
          <div class="left__welcome-text">
            <h2 class="title ">Welcome Abroad</h2>
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
            <h5>{{ $t('sign_up_title') }}</h5>
          </div>
          <div class="auth__content">
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-email" class="input__label">{{ $t('first_name') }}</label>
                <div class="input-block">
                  <input type="text"
                         name="first-name"
                         class="form__input form__input-name"
                         id="first-name"
                         placeholder="John"
                         @focus="$v.firstname.$touch()"
                         v-model="firstname">
                  <img src="~@/assets/img/form/form-name.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="firstnameIsInvalid.invalid">{{ $t(firstnameIsInvalid.errorMessage, { minLength: firstnameIsInvalid.params.minLength }) }}</span>
              </div>
              <div class="field-block">
                <label for="sign-up-email" class="input__label">{{ $t('last_name') }}</label>
                <div class="input-block">
                  <input type="text"
                         name="last-name"
                         class="form__input form__input-name"
                         id="last-name"
                         placeholder="Doe"
                         @focus="$v.lastname.$touch()"
                         v-model="lastname">
                  <img src="~@/assets/img/form/form-name.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="lastnameIsInvalid.invalid">{{ $t(lastnameIsInvalid.errorMessage, { minLength: lastnameIsInvalid.params.minLength }) }}</span>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-email" class="input__label">{{ $t('email') }}</label>
                <div class="input-block">
                  <input type="email"
                         name="e-mail"
                         class="form__input form__input-email"
                         id="sign-up-email"
                         placeholder="johndoe@mail.ru"
                         @focus="$v.userEmail.$touch()"
                         v-model="userEmail">
                  <img src="~@/assets/img/form/form-email.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="emailIsInvalid.invalid">{{ $t(emailIsInvalid.errorMessage, { minLength: emailIsInvalid.params.minLength }) }}</span>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-up-password-1" class="input__label">{{ $t('password') }}</label>
                <div class="input-block">
                  <input type="password"
                         name="password"
                         class="form__input form__input-password"
                         id="sign-up-password-1"
                         placeholder="********"
                         @focus="$v.userPassword.$touch()"
                         v-model="userPassword">
                  <img src="~@/assets/img/form/form-password.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="passwordIsInvalid.invalid">{{ $t(passwordIsInvalid.errorMessage, { minLength: passwordIsInvalid.params.minLength }) }}</span>
              </div>
              <div class="field-block">
                <label for="sign-up-password-2" class="input__label">{{ $t('password') }}</label>
                <div class="input-block">
                  <input type="password"
                         name="password"
                         class="form__input form__input-password"
                         id="sign-up-password-2"
                         placeholder="********"
                         @focus="$v.repeatUserPassword.$touch()"
                         v-model="repeatUserPassword">
                  <img src="~@/assets/img/form/form-password.png" alt="" class="input-img">
                </div>
                <span class="input-block__error" v-if="repeatPasswordIsInvalid.invalid">{{ $t(repeatPasswordIsInvalid.errorMessage, { minLength: repeatPasswordIsInvalid.params.minLength }) }}</span>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit"
                    :disabled="firstnameIsInvalid.invalid || lastnameIsInvalid.invalid || emailIsInvalid.invalid || passwordIsInvalid.invalid || repeatPasswordIsInvalid.invalid"
                    class="form__input form__input_sign-up"
                    :value="$t('sign_up_button')"
                    >
          </div>
          <div class="auth__hint">
            <p class="hint__message">{{ $t('already_have_an_account') }} <router-link class="hint__link" :to="{name: 'sign-in'}">{{ $t('sign_in_button') }}</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { UserFull } from '@/types/store/auth/state-types';
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';
import { emptyEmail, emptyFirstname, emptyLastname, emptyPassword, signupFormOptions, inputDelay } from '@/variables';
import { validateEmail, validatePassword, validateName, checkPasswords } from '@/helpers/auth';

import Vue from 'vue'
import _ from 'lodash';
import { InputError } from '@/types/auth';
export default Vue.extend({
  data() {
    return {
      firstname: '',
      lastname: '',
      userEmail: '',
      userPassword: '',
      repeatUserPassword: '',
      emailValid: emptyEmail,
      passwordValid: emptyPassword,
      repeatPasswordValid: emptyPassword,
      firstnameValid: emptyFirstname,
      lastnameValid: emptyLastname
    }
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(signupFormOptions.firstname.minLength)
    },
    lastname: {
      required,
      minLength: minLength(signupFormOptions.lastname.minLength)
    },
    userEmail: {
      required,
      email,
      minLength: minLength(signupFormOptions.userEmail.minLength)
    },
    userPassword: {
      required,
      minLength: minLength(signupFormOptions.userPassword.minLength)
    },
    repeatUserPassword: {
      required,
      sameAsPassword: sameAs('userPassword')
    }
  },
  computed: {
    firstnameIsInvalid(): InputError {
      return this.firstnameValid
    },
    lastnameIsInvalid(): InputError {
      return this.lastnameValid;
    },
    emailIsInvalid(): InputError {
      return this.emailValid;
    },
    passwordIsInvalid(): InputError {
      return this.passwordValid;
    },
    repeatPasswordIsInvalid(): InputError {
      return this.repeatPasswordValid;
    }
  },
  methods: {
    async submitHandler() {
      let formData: UserFull = {
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.userEmail,
        password: this.userPassword,
      }

      this.$load(async () => {
        await this.$store.dispatch('REGISTER', formData);
        await this.$router.push('/products')
      })
    }
  },
  watch: {
    firstname: _.debounce(function (this: any) {
      this.firstnameValid = validateName(this.$v, signupFormOptions, 'firstname');
    }, inputDelay),
    lastname: _.debounce(function (this: any) {
      this.lastnameValid = validateName(this.$v, signupFormOptions, 'lastname');
    }, inputDelay),
    userEmail: _.debounce(function (this: any) {
      this.emailValid = validateEmail(this.$v, signupFormOptions);
    }, inputDelay),
    userPassword: _.debounce(function(this: any) {
      this.passwordValid = validatePassword(this.$v, signupFormOptions);
    }, inputDelay),
    repeatUserPassword: _.debounce(function(this: any) {
      this.repeatPasswordValid = checkPasswords(this.$v, signupFormOptions, 'repeatUserPassword');
    }, inputDelay)
  }
})
</script>

<style>

</style>
