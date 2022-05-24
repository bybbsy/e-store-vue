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

        <v-menu v-model="langMenu">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="text-capitalize mr-2" color="orange lighten-5" v-bind="attrs" v-on="on" text>
              <v-icon left>mdi-translate</v-icon>
              {{ currentLang }}
              <v-icon small right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list dense>
                <v-list-item v-for="(lang, index) in langs" :key="index" @click="handleMenuItemClick(index)">
                  <v-list-item-title>{{ index }}</v-list-item-title>
                </v-list-item>
              </v-list>
        </v-menu>

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
                  @click="handleLogout"
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
              @click="handleLogout"
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
      </v-list>
      <v-menu v-model="langMenu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="text-capitalize" v-bind="attrs" v-on="on" text>
            <v-icon left>mdi-translate</v-icon>
            {{ currentLang }}
            <v-icon small right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list dense>
              <v-list-item v-for="(lang, index) in langs" :key="index" @click="handleMenuItemClick(index)">
                <v-list-item-title>{{ index }}</v-list-item-title>
              </v-list-item>
            </v-list>
      </v-menu>
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
import { setLanguage } from '@/helpers/lang';
import { allowedUsers, innerLinks, mainLinks } from '@/variables';
import _ from 'lodash';
import { locale } from 'moment';
import Vue from 'vue'
import { I18nOptions } from 'vue-i18n';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
  data: () => ({
    drawer: true,
    navDrawerLinks: [
      { name: 'Dashboard', link: '', icon: 'mdi-view-dashboard-outline', children: innerLinks.dashboard },
      { name: 'Manage items', link: 'admin-crud', icon: 'mdi-barcode-scan', children: innerLinks.manageItems },
      { name: 'E-store', link: '', icon: 'mdi-store-outline', children: innerLinks.estore },
    ],
    generalLinks: mainLinks,
    langMenu: false,
    langs: {}
  }),
  computed: {
    ...mapGetters({
      userData: 'getUserData'
    }),
    userIsAllowed(): boolean {
      return allowedUsers.includes(this.userData.role) ?? false;
    },
    getUsername(): string {
      if(this.userData.firstName) {
        return `${this.userData.firstName} ${this.userData.lastName}`;
      }
      return 'Admin'
    },
    getEmail(): string {
      if(this.userData.email) {
        return this.userData.email;
      }
      return 'user@estore.admin.com';
    },
    currentLang(): string {
      return this.$i18n.locale;
    }
  },
  methods: {
    ...mapActions([
      'setUserData',
      'setUserCart',
      'logout'
    ]),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'sign-in' });
    },
    handleMenuItemClick(lang: string) {
      setLanguage(this.$i18n, lang);
    }
  },
  mounted() {
    this.langs = this.$i18n.messages;
  }
})
</script>>

<style>
</style>
