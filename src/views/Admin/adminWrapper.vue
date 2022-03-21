<template>
  <div class="" >
    <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
          <v-btn
          v-for="(link, index) in links"
          :key="index"
          text
          :to="{ name: link.link }"
        >
          {{ link.name }}
          <v-badge v-if="link.beta" :content="link.betaContent"></v-badge>
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-row class="ma-0">
            <v-list-item-avatar color="grey" size="32" rounded="50%">
              <v-img :src="userData.imgLink"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ getUsername }}</v-list-item-title>
              <v-list-item-subtitle>{{ getEmail }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="ma-0">
                <v-btn
                icon
                color="primary"
                @click="logOut"
                >
                  <a href="">
                    <v-icon size="25">mdi-exit-to-app</v-icon>
                  </a>
                </v-btn>
            </v-list-item-action>
          </v-row>
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
import { allowedUsers } from '@/variables';
import _ from 'lodash';
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    links: [
      { name: 'Dashboard', link: 'admin-main', },
      { name: 'Manage items', link: 'admin-crud',},
      { name: 'E-store', link: 'products'},
      // { name: 'Users', link: 'q', beta: true, betaContent: 'Soon'},
    ]
  }),
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    userIsAllowed() {
      return allowedUsers.includes(this.userData.role) ?? false;
    },
    getUsername() {
      if(this.userData.firstName) {
        return `${this.userData.firstName} ${this.userData.lastName}`;
      }
      return 'Admin'
    },
    getEmail() {
      if(this.userData.email) {
        return this.userData.email;
      }
      return 'user@estore.admin.com';
    }
  },
  methods: {
    ...mapActions([
      'setUserData',
      'setUserCart',
    ]),
    ...mapActions({
      logOut: 'LOGOUT'
    })
  }
})
</script>>

<style>

</style>
