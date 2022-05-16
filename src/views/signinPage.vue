<template>
  <div class="auth__body">
    <div class="auth__left">
      <div class="auth__container _container_left">
        <AuthWelcome title="Welcome back" description="Just a couple clicks and we get started" />
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
            <p class="input-block__error" v-if="authError">{{ authError }}</p>
          </div>
          <div class="auth__hint">
            <p class="hint__message">{{ $t('dont_have_an_accound') }}<router-link class="hint__link" :to="{name: 'sign-up'}">{{ $t('sign_up_title') }}</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

def
<script lang="ts">
import { User } from '@/types/store/auth/state-types';
import { email, required, minLength, decimal } from 'vuelidate/lib/validators';
import Vue from 'vue';
import { allowedUsers, emptyEmail, emptyPassword, inputDelay, signinFormOptions } from '@/variables';
import { userIsAuthorized, validateEmail, validatePassword } from '@/helpers/auth';
import { InputError } from '@/types/auth';
import _ from 'lodash';
import store from '@/store';
import firebase from 'firebase/compat';
import { mapActions } from 'vuex';


export default Vue.extend({
  data() {
    return {
      userEmail: '',
      userPassword: '',
      number: '',
      emailValid: emptyEmail,
      passwordValid: emptyPassword,
      authError: ''
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
    },
    passwordIsInvalid(): InputError {
      return this.passwordValid;
    }
  },
  methods: {
    ...mapActions([
      'setUserData',
      'setUserCart',
    ]),
    async submitHandler() {
      this.authError = '';
      let formData: User =  {
        email: this.userEmail,
        password: this.userPassword
      }

      this.$load(async () => {
        await this.$store.dispatch('login', formData);

        const userID = userIsAuthorized();

        if(userID) {
          let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();

          let userData = _.omit(response, ['cart'])

          let cart = JSON.parse(response.cart);

          this.setUserData(userData);
          this.setUserCart(cart);

          if(allowedUsers.includes(userData.role)) {
            this.$router.push({ name: 'admin-main' })
          } else {
            this.$router.push('/products')
          }
        }
      }, (error) => {
        this.authError = error.message;
      })

    }
  },
  watch: {
    userEmail: _.debounce(function(this: any) {
      this.emailValid = validateEmail(this.$v, signinFormOptions);
    }, inputDelay),
    userPassword: _.debounce(function(this: any) {
      this.passwordValid = validatePassword(this.$v, signinFormOptions);
      console.log(this.userPassword)
    }, inputDelay)
  },
  components: {
    AuthWelcome: () => import('@/components/Auth/AuthWelcome.vue')
  }
})
</script>

<style>
</style>
