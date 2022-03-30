<template>
  <div class="header__input">
      <input type="text" name="search-input" placeholder="Search by name" class="search__input" v-model="input">
      <div class="input__icon">
          <img src="~@/assets/img/base/Search.png" alt="Search...">
      </div>
  </div>
</template>

<script lang="ts">
import { findByField } from '@/helpers/useProducts'
import _ from 'lodash'
import Vue from 'vue'
import { mapActions } from 'vuex'
export default Vue.extend({
    name: 'header-input',
    data() {
      return {
        input: ''
      }
    },
    methods: {
      ...mapActions([
        'setProducts'
      ])
    },
    watch: {
      input: _.debounce(async function (this: any, value: string) {
        let result = await findByField('name', value);

        if(!result.length) {
          result = await findByField('category', value);
        }

        this.setProducts(result);

        console.log(result)
      }, 500)
    }
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
    border: 2px solid var(--main-purple);
    padding: 16px 16px 16px 70px;
    font-size: 1.125em;
    font-weight: 500;
    color: var(--main-white);
    transition: all 0.2s ease-in-out;
}

.search__input:hover,
.search__input:focus {
    background-color: var(--main-purple);
}

.search__input:focus {
    border: 2px solid var(--main-orange);
    font-size: 1.3em;
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
