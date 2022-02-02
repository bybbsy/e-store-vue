<template>
    <div class="default-wrapper">
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'default-layout'
})
</script>