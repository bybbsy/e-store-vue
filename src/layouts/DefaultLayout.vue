<template>
    <div class="default-wrapper">
        <TheNavbar/>
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from '../components/TheNavbar/TheNavbar.vue';
import firebase from "firebase/compat/app";
import { mapActions } from 'vuex';
import { userIsAuthorized } from "@/helpers/auth";

export default Vue.extend({
    name: 'default-layout',
    components: {
        TheNavbar
    },
    async mounted() {
      const userID = userIsAuthorized();

      if(userID) {
        let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();
        this.setUserData(response);
      }
    },
    methods: {
      ...mapActions(
        ['setUserData']
      )
    }
})
</script>

<style>
.default-wrapper {
    display: flex;
    flex: 1 1 auto;
}
</style>
