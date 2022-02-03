<template>
    <div class="default-wrapper">
        <TheNavbar/>
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from '../components/TheNavbar/TheNavbar.vue';

export default Vue.extend({
    name: 'default-layout',
    components: {
        TheNavbar
    }
})
</script>

<style>
.default-wrapper {
    display: flex;
    flex: 1 1 auto;
}

</style>