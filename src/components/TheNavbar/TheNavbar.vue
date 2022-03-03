<template>
    <!--#TODO navbar navbar_collapsed if navbar is collapsed-->
  <aside class="navbar">
      <div class="navbar__container">
          <div class="navbar__user-block">
              <div class="user-block__body">
                  <div class="user-block__icon">
                      <img :src="userData.imgLink" alt="Avatar">
                  </div>
                  <div class="user-block__username">
                      <p>¡Hola, {{ getUsername }}</p>
                  </div>
              </div>
          </div>
          <BlockFilter/>
          <div class="navbar__auth-block">
              <div class="auth-block__buttons" v-if="uid">
                  <a href="" class="auth-block__button auth-block__button_sign-out" @click="logOut">Sign out</a>
              </div>
              <div class="auth-block__buttons" v-else>
                  <router-link :to="{ name: 'sign-up'}" class="auth-block__button auth-block__button_sign-up">Sign up</router-link>
                  <router-link :to="{ name: 'sign-in'}" class="auth-block__button auth-block__button_sign-in">Sign in</router-link>
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
      userData: 'getUserData'
    }),
    getUsername() {
      return `${this.userData.firstName} ${this.userData.lastName}`;
    }
  },
  methods: {
    ...mapActions({
      logOut: 'LOGOUT'
    })
  },
  components: {
    BlockFilter
  },
})
</script>

<style>
.navbar {
  min-width: 300px;
  background-color: var(--secondary-dark);
  padding: 50px 0;
  overflow: hidden scroll;
  height: 100vh;
  scrollbar-width: none;
}

.navbar::-webkit-scrollbar {
  display: none;
}

.navbar__container {
  width: 215px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 100%;
}

.navbar__user-block {
  margin: 0 0 45px;
}

.user-block__username {
  line-height: 150%;
  text-align: center;
  font-weight: 600;
  color: var(--main-white);
  font-size: 1.5em;
}

.user-block__icon {
  position: relative;
  margin: 0 auto 25px;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  cursor: pointer;
}

.user-block__icon img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.navbar__auth-block {
  display: flex;
  flex: 1 1;
}
.auth-block__buttons {
  display: flex;
  flex-direction: column;
  margin: auto 0 0;
  width: 100%;
  height: 100%;
}

.auth-block__button:not(:last-child) {
  margin: 0 0 5px;
}

.auth-block__button {
  width: 100%;
  border-radius: 25px;
  min-height: 50px;
  color: var(--main-white);
  line-height: 27px;
  padding: 10px 18px;
  font-size: 1.125em;
  text-align: center;
  transition: 0.2s all ease;
}

.auth-block__button:hover {
  box-shadow: 0px 0px 2px 1px var(--main-white);
}

.auth-block__button_sign-up {
  background-color: var(--main-orange);
}

.auth-block__button_sign-in {
  background-color: var(--main-success);
}

.auth-block__button_sign-out {
  background-color: var(--main-error);
}

@media screen and (max-width: 1080px) {
  .navbar {
    min-width: 150px;
  }

  .navbar__container {
    width: 135px;
  }

  .user-block__icon {
    width: 60px;
    height: 60px;
  }

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
  margin-left: 0;
}
@media screen and (max-width: 980px) {
  .navbar {
    min-width: 300px;
    margin-left: -300px;
  }


}
</style>
