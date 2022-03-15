<template>
  <div class="page">
    <header class="header">
      <h5 class="header--title">Your personal data</h5>
    </header>

    <main class="main">
      <section class="settings-content">
        <form action="" @submit.prevent="submitForm" class="form">
          <div class="form--row my-5">
            <h5 class="form--title">Personal information</h5>
            <div class="form--group l-four-rows">
              <div class="input-block">
                <label class="input-label mr-2" for="input-firstname">First name:</label>
                <input type="tel" class="form-input input-orange mr-2" id="input-firstname" name="inputFirstname"/>
                <button class="button button-change">
                  <font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/>
                </button>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-secondname">Second name:</label>
                <input type="text" class="form-input input-orange mr-2" id="input-secondname" placeholder="Second name"/>
                <button class="button button-change">
                  <font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/>
                </button>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-email">Email:</label>
                <input type="email" class="form-input input-orange mr-2" id="input-email" placeholder="username@mail.ru"/>
                <button class="button button-change">
                  <font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/>
                </button>
              </div>
            </div>
          </div>
          <div class="form-row my-5">
            <h5 class="form--title">Contacts</h5>
            <div class="form--group l-four-rows">
              <div class="input-block">
                <label class="input-label mr-2" for="input-tel">Tel:</label>
                <input type="tel" class="form-input input-orange mr-2" v-mask="'+# (###) ###-##-##'" id="input-tel" placeholder="8-950-111-11-11"/>
                <button class="button button-change"><font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/></button>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-birt-date">Date of birth:</label>
                <input type="date" class="form-input input-orange mr-2" id="input-birt-date" placeholder="15/05/1999"/>
                <button class="button button-change"><font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/></button>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-zip">Zip:</label>
                <input type="text" class="form-input input-orange mr-2" v-mask="'######'" id="input-zip" placeholder="111777"/>
                <button class="button button-change"><font-awesome-icon icon="fa-solid fa-pencil" class="orange-pencil"/></button>
              </div>
            </div>
          </div>
          <div class="form-row my-5">
            <h5 class="form--title">Credit card</h5>
            <div class="form--group l-four-rows">
              <div class="input-block">
                <label class="input-label mr-2" for="input-card-number">Card number:</label>
                <input type="tel" class="form-input input-orange mr-2" v-mask="'#### #### #### ####'" id="input-card-number" placeholder="84916 4799 3894 1051"/>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-card-owner">Card owner:</label>
                <input type="text" class="form-input input-orange mr-2" id="input-card-owner" placeholder="CARD OWNER"/>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-card-exp">Card exp:</label>
                <input type="tel" class="form-input input-orange mr-2" v-mask="'##/##'" id="input-card-exp" placeholder="11/11"/>
              </div>
              <div class="input-block">
                <label class="input-label mr-2" for="input-card-code">Security code:</label>
                <input type="password" class="form-input input-orange mr-2" v-mask="'###'" id="input-card-code" placeholder="***"/>
              </div>
            </div>
          </div>
          <div class="">
            <button type="submit" class="button button-submit">Apply changes</button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mask } from 'vue-the-mask';

export default Vue.extend({
  data() {
    return {
      form: {
        inputFirstname: ''
      }
    }
  },
  methods: {
    submitForm(event: any) {
      console.log(event.target.elements.inputFirstname)
    }
  },
  watch: {
    inputTel(event) {
      console.log(event.target.elements)
    }
  },
  directives: {
    mask
  }
})
</script>

<style scoped>
@import '~@/assets/css/SMACSS/index.css';
</style>
