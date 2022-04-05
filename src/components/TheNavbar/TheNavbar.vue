<template>
    <!--#TODO navbar navbar_collapsed if navbar is collapsed-->
  <aside class="navbar" :class="{ 'navbar__expanded': navbarIsExpanded }">
      <div class="navbar__container">
          <div class="navbar__user-block">
              <div class="navbar___body">
                  <div class="navbar__avatar">
                      <img :src="userData.imgLink" alt="Avatar">
                  </div>
                  <div class="navbar__username">
                      <p>{{ getUsername }}</p>
                  </div>

                  <div class="navbar__email">
                    <p>{{ userData.email }} </p>
                  </div>
              </div>
          </div>
          <BlockFilter/>
          <div class="navbar__auth-block">
              <div class="navbar__buttons-group" v-if="uid">
                  <a href="" class="navbar__button navbar__button_sign-out" @click="logOut">Sign out</a>
              </div>
              <div class="navbar__buttons-group" v-else>
                  <router-link :to="{ name: 'sign-up'}" class="navbar__button navbar__button_sign-up">Sign up</router-link>
                  <router-link :to="{ name: 'sign-in'}" class="navbar__button navbar__button_sign-in">Sign in</router-link>
              </div>
          </div>
      </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import BlockFilter from './BlockCategories.vue';
import { userIsAuthorized } from '@/helpers/auth';

export default Vue.extend({
  name: 'the-navbar',
  computed: {
    uid() {
      return userIsAuthorized();
    },
    ...mapGetters({
      userData: 'getUserData',
      navbarIsExpanded: 'navbarIsExpanded'
    }),
    getUsername(): string {
      return `${this.userData.firstName} ${this.userData.lastName}`;
    }
  },
  methods: {
    ...mapActions({
      logout :'logout'
    }),
    async logOut() {
      await this.logout();
      this.$router.push({ name: 'sign-in' });
    }
  },
  components: {
    BlockFilter
  },
})
</script>

<style>
@media screen and (max-width: 1080px) {

  .filter-block__main-filter,
  .filter-element__name {
    display: none;
  }

  .filter-element {
    justify-content: center;
  }

  .filter-element__icon {
    margin: 0 auto;
  }
}

.navbar__expanded {
  margin-left: 0 !important;
}
</style>
