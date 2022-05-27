<template>
  <div class="alert" :class="alerts[type].class">
    <div class="alert__container">
      <div class="alert__icon">
        <div class="alert__image">
          <font-awesome-icon :icon=alerts[type].icon />
        </div>
      </div>
      <div class="alert__info">
        <p class="alert__text">Here is alert text</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CreateElement } from 'vue'

export default {
  name: 'alert-component',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // timeout: null as null | number,
      alerts: {
        success: {
          class: 'alert_success',
          icon: 'fa-solid fa-circle-check'
        },
        warn: {
          class: 'alert_warn',
          icon: 'fa-solid fa-circle-exclamation'
        },
        info: {
          class: 'alert_info',
          icon: 'fa-solid fa-circle-info'
        },
        error: {
          class: 'alert_error',
          icon: 'fa-solid fa-circle-xmark'
        }
      }
    }
  },
  // created() {
  //   this.timeout = setTimeout(() => {

  //   })
  // }
}
</script>

<style>

.alert {
  display: flex;
  border-radius: 7px;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.alert__container {
  margin: 10px 15px;
  display: flex;
  align-items: center;
}

.alert__image {
  font-size: 1.5em;
}


.alert__info {
  font-size: 1.1em;
}

.alert__text {
  margin-left: 5px;
}


.alert_success {
  background-color: #03A65A;
  color: white;
}

.alert_warn {
  background-color: #F88F01;
  color: white;
}

.alert_info {
  background-color: #0070E0;
  color: white;
}

.alert_error {
  background-color: #FC2E20;
  color: white;
}
</style>
