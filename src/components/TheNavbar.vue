<template>
    <!--#TODO navbar navbar_collapsed if navbar is collapsed-->
    <aside class="navbar">
        <div class="navbar__user-block">
            <div class="user-block__container _nav-container">
                <div class="user-block__body">
                    <div class="user-block__icon">
                        <img src="./Avatar.jpg" alt="Avatar">
                    </div>
                    <div class="user-block__username">
                        <p>¡Hola, Yuxin!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar__filters-block"></div>
        <div class="navbar__ads-block"></div>
    </aside>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'the-navbar'
})
</script>

<style>
.navbar {
    display: flex;
    justify-content: center;
    width: 300px;
    min-height: 100%;
    background-color: #28272B;
    padding: 50px 0;
}

._nav-container {
    width: 215px;
}

.navbar__user-block {
    margin: 0 0 25px;
}

.user-block__username {
    line-height: 150%;
    text-align: center;
    font-weight: 600;
    color: #fff;
}

.user-block__icon {
    position: relative;
    margin: 0 auto 25px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
}

.user-block__icon img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit; 
}

</style>