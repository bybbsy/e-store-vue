<template>
    <div class="empty-page">
        <router-view/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'empty-layout'
})
</script>