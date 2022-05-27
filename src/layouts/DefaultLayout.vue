<template>
  <div class="default-wrapper">
    <TheNavbar/>
      <router-view/>
    <Snackbar />
    <alert type="success"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from '../components/TheNavbar/TheNavbar.vue';
import Snackbar from '../components/Snackbar.vue';
import firebase from "firebase/compat/app";
import { mapActions, mapGetters } from 'vuex';
import { userIsAuthorized } from "@/helpers/auth";
import _ from 'lodash';

export default Vue.extend({
    name: 'default-layout',
    components: {
      TheNavbar,
      Snackbar,
      alert: () => import('../components/Alert.vue')
    },
    async mounted() {
      const userID = userIsAuthorized();

      if(userID) {
        let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();

        let userData = _.omit(response, ['cart'])

        console.log(response)
        let cart = JSON.parse(response.cart);

        this.setUserData(userData);
        this.setUserCart(cart);
      }
    },
    methods: {
      ...mapActions([
        'setUserData',
        'setUserCart'
      ])
    }
})
</script>

<style>
body {
  overflow: hidden;
}
.default-wrapper {
  position: relative;
  overflow: hidden;

  display: flex;
  flex: 1 1 auto;
}
</style>
