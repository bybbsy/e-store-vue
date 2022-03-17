<template>
  <div class="">
    <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-tab
          v-for="(link, index) in links"
          :key="index"
          text
          :to="{ name: link.link }"
        >
          {{ link.name }}
          <v-badge v-if="link.beta" :content="link.betaContent"></v-badge>
        </v-tab>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  </div>
</template>

<script lang="ts">
import { userIsAuthorized } from '@/helpers/auth';
import store from '@/store';
import firebase from 'firebase/compat';
import _ from 'lodash';
import Vue from 'vue'
import { mapActions } from 'vuex';

export default Vue.extend({
  data: () => ({
    links: [
      { name: 'Dashboard', link: 'admin-main', },
      { name: 'Manage items', link: 'admin-crud',},
      { name: 'Users', link: '', beta: true, betaContent: 'Soon'},
    ],
  }),
  async created() {
    const userID = userIsAuthorized();

    if(userID) {
      let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();

      let userData = _.omit(response, ['cart'])

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
</script>>

<style>

</style>
