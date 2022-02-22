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


export default Vue.extend({
    name: 'default-layout',
    components: {
        TheNavbar
    },
    async mounted() {
      const userID = await this.getUid;

      if(userID) {
        let response = (await firebase.database().ref(`/users/${userID}/info`).get()).val();
        this.setUserData(response);
      }
    },
    methods: {
      ...mapActions(
        ['setUserData']
      )
    },
    computed: {
      ...mapActions([
        'getUid'
      ])
    }
})
</script>

<style>
.default-wrapper {
    display: flex;
    flex: 1 1 auto;
}
</style>
