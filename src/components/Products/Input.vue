<template>
    <div class="header__input">
        <input type="text" name="search-input" placeholder="Search" class="search__input">
        <div class="input__icon">
            <img src="~@/assets/base/Search.png" alt="Search...">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'header-input',
})
</script>

<style scoped>

.header__input {
    position: relative;
}

.search__input {
    width: 370px;
    height: 60px;
    background-color: transparent;
    border-radius: 50px;
    border: 2px solid #323036;
    padding: 16px 16px 16px 70px;
    font-size: 1.125em;
    font-weight: 500;
    color: #fff;
}

.input__icon {
    position: absolute;
    top: 15px;
    left: 20px;
    cursor: pointer;
}


.input__icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

</style>