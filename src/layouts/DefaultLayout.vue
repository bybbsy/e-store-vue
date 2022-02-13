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


export default Vue.extend({
    name: 'default-layout',
    components: {
        TheNavbar
    },
    async mounted() {
      let response = await firebase.database().ref(`/users/${firebase.auth().currentUser?.uid}/info`).get();
      let user = response.exists() ? response.val() : null;
      console.log(user)
    }
})
</script>

<style>
.default-wrapper {
    display: flex;
    flex: 1 1 auto;
}
</style>
