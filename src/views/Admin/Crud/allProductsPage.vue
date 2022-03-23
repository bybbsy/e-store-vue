<template>
  <form action="">
    <v-row class="ma-0 align-center">
      <v-col>
        <v-app-bar-title>
          <h6>Remove the product you find</h6>
        </v-app-bar-title>
      </v-col>
      <v-col :class="getResponviseColsMobile">
        <v-text-field
          v-model.trim="searchById"
          label="Find item by id"
          color="teal"
          filled
          dense
          rounded
          append-icon="mdi-magnify"
          hide-details=""
        ></v-text-field>
      </v-col>
      <v-col :class="getResponviseColsMobile">
        <v-text-field
          v-model.trim="searchByCategory"
          label="Find item by category"
          color="teal"
          filled
          dense
          rounded
          append-icon="mdi-magnify"
          hide-details=""
        ></v-text-field>
      </v-col>
      <v-col :class="getResponviseColsMobile">
        <v-text-field
          v-model.trim="searchByName"
          label="Find item by name"
          color="teal"
          filled
          dense
          rounded
          append-icon="mdi-magnify"
          hide-details=""
        ></v-text-field>
      </v-col>
    </v-row>
    <v-col cols="12" class="ma-0">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        :loading="loading"
        loader-height="100"
        mobile-breakpoint="1000"
        no-data-text="Ниче не нашел"
        loading-text="Loading data"
        height
        class="elevation-1"
      >
        <template v-slot:item.imgLink="{ item }">
          <div class="p-2">
            <v-img :src="item.imgLink" :alt="item.imgLink" contain width="55" height="55"></v-img>
          </div>
        </template>
        <template v-slot:item.rate="{ item }">
          <v-chip
            :color="getColorRate(item.rate)"
          >
          {{ item.rate }}
          </v-chip>
        </template>
        <template v-slot:item.category="{ item }">
          <v-chip
            :color="getColorCategory(item.category)"
          >
          {{ item.category }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
    <v-dialog
      v-model="dialogEdit"
      max-width="750px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit item</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.name"
                  label="Product name"
                  counter="100"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  counter="1000"
                ></v-textarea>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.fat"
                  label="Fat (g)"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.carbs"
                  label="Carbs (g)"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.protein"
                  label="Protein (g)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeEdit"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveEdit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px" >
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-text class="mx-0 my-2 py-0">ID: {{ editedItem.productID }}</v-card-text>
        <v-card-text class="mx-0 my-2  py-0">Name: {{ editedItem.name }} </v-card-text>
        <v-row class="my-0 mx-5 pa-0 d-flex align-center">
          <v-rating
            class="ma-0 pa-0"
            :value="editedItem.rate"
            color="amber"
            dense
            half-increments
            readonly
            ></v-rating>
          <span>({{ editedItem.rate }})</span>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </form>
</template>

<script lang="ts">
import { findByField, findById } from '@/helpers/useProducts';
import { ProductCategories } from '@/types/products';
import { Product, ProductCategory } from '@/types/store/products/state-types';
import firebase from 'firebase/compat';
import _ from 'lodash';
import Vue from 'vue';


export default Vue.extend({
  data() {
    return {
      categoriesColors: {
        toys: 'success',
        health: 'primary',
        food: 'orange'
      } as ProductCategories,
      headers: [
          { text: 'productId', value: 'productID', sortable: false },
          { text: 'Image', value: 'imgLink', sortable: false },
          {
            text: 'Product',
            align: 'start',
            value: 'name',
          },
          { text: 'category', value: 'category' },
          { text: 'rate', value: 'rate' },
          { text: 'price', value: 'price' },
          { text: 'currency', value: 'currency' },
          { text: 'Actions', value: 'actions', sortable: false }
      ],
      items: [] as Array<Product>,
      loading: false,
      searchByName: '',
      searchByCategory: '',
      searchById: '',
      // dialog: true,
      dialogEdit: false,
      dialogDelete: false,
      editedItem: {
        productID: '',
        category: '',
        currency: '',
        description: '',
        imgLink: '',
        name: '',
        price: 0,
        rate: 0
      } as Product,
      defaultItem: {
        productID: '',
        category: '',
        currency: '',
        description: '',
        imgLink: '',
        name: '',
        price: 0,
        rate: 0
      } as Product,
      editedIndex: -1
    }
  },
  computed: {
    getResponviseColsMobile() {
      let cols = 'col-';
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return cols + 12
        case 'mobile': return cols + 12
        case 'md':
        case 'sm': return cols + 6
      }
      return cols + 2
    },
    getItems(): { length: number, result: Array<Product> } {
      return {
        length: this.items.length,
        result: this.items
      }
    }
  },
  methods: {
    getColorRate(rate: number) {
      if(rate < 3) return 'warning'
      else if(rate >= 3 && rate < 4) return 'orange'
      else if(rate >= 4 && rate < 5) return 'primary'
      else if(rate === 5) return 'success'
    },
    getColorCategory(category: ProductCategory) {
      return this.categoriesColors[category as keyof ProductCategories]
    },
    deleteItem (item: Product) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm () {
      const response = await firebase.firestore().collection('products').doc(this.editedItem.productID).delete();

      console.log(this.editedItem)
      this.items.splice(this.editedIndex, 1);

      console.log(response);

      this.closeDelete()
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem(item: Product) {
      this.dialogEdit = true;
      console.log(item)
    },
    closeEdit() {
      this.dialogEdit = false;
    },
    saveEdit() {
      console.log('save')
    }
  },
  watch: {
    searchByName: _.debounce(async function(this: any, value: string) {
      this.loading = true;

      this.items = await findByField('name', value);

      this.loading = false
    }, 500),
    searchById: _.debounce(async function(this: any, value: string) {
      this.loading = true;

      this.items = await findById(value);

      this.loading = false
    }, 500),

    searchByCategory: _.debounce(async function(this: any, value: string) {
      this.loading = true;

      this.items = await findByField('category', value);

      this.loading = false
    }, 500)
  }
})
</script>

<style>

</style>
