<template>
  <div class="auth__body">
    <div class="auth__left">
      <div class="auth__container _container_left">
        <div class="left__content">
          <div class="left__image">
            <img src="~@/assets/base/Welcome.png" alt="Welcome image">
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
                  <input type="email" name="e-mail" class="form__input form__input-email" id="sign-in-email" placeholder="John" v-model="userEmail">
                  <img src="~@/assets/form/form-email.png" alt="" class="input-img">
                </div>
              </div>
            </div>
            <div class="auth__row">
              <div class="field-block">
                <label for="sign-in-password" class="input__label">{{ $t('password') }}</label>
                <div class="input-block">
                  <input type="password" name="password" class="form__input form__input-password" id="sign-in-password" placeholder="********" v-model="userPassword">
                  <img src="~@/assets/form/form-password.png" alt="" class="input-img">
                </div>
              </div>
            </div>
          </div>
          <div class="auth__control">
            <input type="submit" :value="$t('sign_in_button')" class="form__input form__input_sign-in">
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
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      userEmail: '',
      userPassword: ''
    }
  },
  async mounted() {
    let response = await fetch('https://61fc82df3f1e34001792c8cf.mockapi.io/users/1')
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'Application/json'
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     email: this.userEmail,
    //     password: this.userPassword
    //   })
    // });
    let data = await response.json();
    console.log(data);
  },
  methods: {
    async submitHandler() {
      let response = await fetch('https://61fc82df3f1e34001792c8cf.mockapi.io/users/' )
      // method: 'POST',
      // headers: {
      //   'Content-Type': 'Application/json'
      // },
      // body: JSON.stringify({
      //   email: this.userEmail,
      //   password: this.userPassword
      // })
    // });
    let data = await response.json();
    console.log(data)
    }
  }
})
</script>

<style>
</style>

// {
//     "name": "Rosemarie Macejkovic",
//     "lastname": "Hansen",
//     "password": "vJNKBRtxdllMJ96",
//     "avatar": "http://placeimg.com/640/480",
//     "email": "Terry30@hotmail.com",
//     "id": "1"
//   },
