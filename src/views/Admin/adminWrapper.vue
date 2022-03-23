<template>
  <div class="" >
    <v-app sm="1024">
    <v-app-bar
      app
      color="orange darken-1"
      flat
      bottom
    >
      <v-container class="py-0 fill-height" v-if="!$vuetify.breakpoint.mobile">
          <v-btn
          class="white--text"
          v-for="(link, index) in generalLinks"
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
                  color="white"
                  @click="logOut"
                >
                  <v-icon  size="25">mdi-exit-to-app</v-icon>
                </v-btn>
            </v-list-item-action>
          </v-row>
        </v-responsive>
      </v-container>
      <v-container class="py-0 fill-height" v-else>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          class="white--text"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.mobile"
      v-model="drawer"
      absolute
      temporary
      >
      <v-list color="orange">
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="userData.imgLink"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ getUsername }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ getEmail }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-col cols="2">
            <v-btn
              icon
              color="white"
              @click="logOut"
            >
              <v-icon  size="25">mdi-exit-to-app</v-icon>
            </v-btn>
          </v-col>
        </v-list-item>
        </v-list>
      <v-list
        nav
        dense
        >
        <v-list-group
            v-for="(mainLink, mainIndex) in navDrawerLinks"
            :key="mainIndex"
            :to="{ name: mainLink.link }"
            :prepend-icon="mainLink.icon"

            >

            <template v-slot:activator>
              <v-list-item-content>
                 <v-list-item-title>{{ mainLink.name }}</v-list-item-title>
              </v-list-item-content>
            </template>

              <v-list-item v-for="(subLink, subIndex) in mainLink.children" :key="subIndex" link :to="{ name: subLink.link }">
                <v-list-item-title v-text="subLink.name"></v-list-item-title>
                <v-list-item-icon>
                  <v-icon size="25" v-text="subLink.icon"></v-icon>
                </v-list-item-icon>
              </v-list-item>
          </v-list-group>



          <!-- <v-list-item v-for="(mainLink, mainIndex) in links" :key="mainIndex" :to="{ name: mainLink.link }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ mainLink.name }}
            </v-list-item-title>

            <v-list-item-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(link, index) in links" :key="index" :to="{ name: link.link }">
              <v-list-item-title>{{ link.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
          </v-list-item> -->
      </v-list>
    </v-navigation-drawer >
    <v-main class="orange lighten-2">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  </div>
</template>

<script lang="ts">
import { allowedUsers, innerLinks, mainLinks } from '@/variables';
import _ from 'lodash';
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    drawer: true,
    navDrawerLinks: [
      { name: 'Dashboard', link: '', icon: 'mdi-view-dashboard-outline', children: innerLinks.dashboard },
      { name: 'Manage items', link: 'admin-crud', icon: 'mdi-barcode-scan', children: innerLinks.manageItems },
      { name: 'E-store', link: '', icon: 'mdi-store-outline', children: innerLinks.estore },
      // { name: 'Users', link: 'q', beta: true, betaContent: 'Soon'},
    ],
    generalLinks: mainLinks
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
  // created() {
  //   this.$load(async () => {

  //       const userID = userIsAuthorized();

  //       if(userID) {
  //         let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();

  //         let userData = _.omit(response, ['cart'])

  //         let cart = JSON.parse(response.cart);

  //         this.setUserData(userData);
  //         this.setUserCart(cart);

  //         if(allowedUsers.includes(userData.role)) {
  //           // this.$router.push({ name: 'admin-main' })
  //         } else {
  //           // this.$router.push('/products')
  //         }
  //       }
  //     })
  // },
  methods: {
    ...mapActions([
      'setUserData',
      'setUserCart',
    ]),
    logOut() {
      this.$store.dispatch('LOGOUT');
      this.$router.go(0);
    }
  }
})
</script>>

<style>
</style>
