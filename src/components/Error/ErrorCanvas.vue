<template>
  <div class="error-canvas" >
    <canvas class="canvas-block" ref="canvasBlock"></canvas>
    <div class="error-content">
      <div class="error-content__animations">
        <img src="~@/assets/img/base/astronaut.svg" alt="" class="animation__element animation__element_astronaut _place-top">
        <img src="~@/assets/img/base/digit.svg" alt="" class="animation__element animation__element_digit _place-left _place-bottom">
        <img src="~@/assets/img/base/digit.svg" alt="" class="animation__element animation__element_digit _place-right _place-bottom">
        <img src="~@/assets/img/base/planet.svg" alt="" class="animation__element animation__element_planet _place-bottom">
        <img src="~@/assets/img/base/hosepipe.svg" alt="" class="animation__element animation__element_hosepipe">
        <img src="~@/assets/img/base/rocket.svg" alt="" class="animation__element animation__element_rocket">
      </div>
      <div class="error-content__text">
        <p class="error-text__title">oops!</p>
        <p class="error-text__description">Page no found</p>
      </div>
      <div class="error-content__links">
        <router-link :to="{name: 'products'}" class="error-link">Go home</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import _ from 'lodash';
import { init } from '@/helpers/drawer/index';

export default Vue.extend({

  mounted() {
    const canvas = this.$refs.canvasBlock as HTMLCanvasElement;
    init(canvas);
  },
})
</script>

<style>
.error-canvas {
  position: relative;
  display: flex;
  height: 100%;
  background: var(--dark-error-page);
}

.error-content {
  /* background: white; */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.error-content__text {
  color: #fff;
  text-align: center;
}

.error-text__title {
  line-height: 150%;
  font-size: 4em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.025em;
}

.error-text__description {
  line-height: 150%;
  font-size: 2em;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.025em;
}

.error-content__links {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.error-link {
  margin-top: 15px;
  padding: 5px 7px;
  border-radius: 5px;
  border: 1px solid var(--main-white);
  color: var(--main-white);
  font-size: 1.5em;
  transition: all 0.2s ease;
}

.error-link:hover {
  border-color: var(--main-orange);
}

.error-content__animations {
  position: relative;
  width: 100%;
  height: 300px;
}

.animation__element {
  position: absolute;
  top: 0;
  left: 0;
}

._place-top {
  top: 0;
  bottom: unset;
}

._place-bottom {
  top: unset;
  bottom: 0;
}

._place-left {
  left: 0;
  right: unset
}

._place-right {
  left: unset;
  right: 0;
}

.animation__element_digit {
  animation: shakeMe;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
}

.animation__element_digit:nth-child(3) {
  z-index: 3;
  animation: digitJumps, shakeMe;
  animation-duration: 2.5s, 0.6s;
  animation-iteration-count: infinite;
}

.animation__element_planet {
  z-index: 2;
  width: 200px;
  left: 50%;
  transform: translateX(-50%);
}

.animation__element_astronaut {
  z-index: 3;
  left: 50%;
  transform: translateX(-50%);
}

.animation__element_hosepipe {
  right: -70px;
  top: -100px;
  left: unset;
}

.animation__element_rocket {
  left: unset;
  right: -150px;
  top: -120px;

  animation: rocketMove;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}

.animation__element_planet {
  animation: bigger, rotate;
  transition: scale 0.6s, 0.6s;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
}


@keyframes shakeMe {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes digitJumps {
  0% {
    bottom: 0;
  }
  25%{
    transform: rotate(-25deg);
    bottom: -35px;
  }
  50% {
    bottom: 20px;
  }
  75% {
    bottom: 0;
    transform: rotate(25deg);
  }
  100% {
    bottom: 0;
    transform: rotate(0);
  }
}

@keyframes rocketMove {
  0% {
    transform: translate3d(0, 0, 0) rotate(-10deg);
  }
  15% {
    transform: translate3d(-25%, 5%, 0) rotate(-10deg);
  }
  25% {
    transform: translate3d(0, 0, 0) rotate(-10deg);
  }
  50% {
    transform: translate3d(15%, -55%, 0) rotate(-20deg);
  }
  75%, 100% {
    transform: translate3d(0, 0, 0) rotate(-10deg);
  }
}

@keyframes bigger {
  0% {
    transform: translateX(-50%) rotate(0deg);
  }
  25% {
    transform: translateX(-75%) rotate(10deg);
  }
  50% {
    transform: translateX(-50%) rotate(20deg);
  }
  75% {
    transform: translateX(-25%) rotate(10deg);
  }
  100% {
    transform: translateX(-50%) rotate(00deg);
  }
}
</style>
