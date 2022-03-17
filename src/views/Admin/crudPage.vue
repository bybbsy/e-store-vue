<template>
  <v-row>
    <v-col cols="2">
      <v-sheet rounded="lg">
        <v-list-item-group
          color="primary"
          v-model="selectedItem"
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

          <v-divider class="my-2"></v-divider>

          <v-list-item
            link
            color="grey lighten-4"
          >
            <v-list-item-content>
              <v-list-item-title>
                Refresh
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
      selectedItem: '',
      actions: [
        { name: 'Add', link: 'crud-create', icon: 'mdi-plus-circle-outline' },
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
