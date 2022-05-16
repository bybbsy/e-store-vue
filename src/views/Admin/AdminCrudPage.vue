<template>
  <v-row>
    <v-col cols="2" v-if="!$vuetify.breakpoint.mobile">
      <v-sheet rounded="lg">
        <v-list rounded>
          <v-list-item-group
            color="teal darken-2"
            v-model="selectedItem"
            rounded="0"
            >
              <v-list-item
                v-for="(action, index) in actions"
                :key="index"
                :to="{ name: action.link }"
                link
              >
              <v-list-item-icon>
                  <v-icon v-text="action.icon"></v-icon>
                </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="action.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet
        min-height="70vh"
        rounded="lg"
      >
        <router-view/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => {
    return {
      selectedItem: null,
      actions: [
        { name: 'Create', link: 'crud-create', icon: 'mdi-hamburger-plus' },
        { name: 'Manage', link: 'crud-all', icon: 'mdi-food' }
      ]
    }
  },
  watch: {
    selectedItem(value) {
      console.log(value)
    }
  }
})
</script>

<style>
</style>
