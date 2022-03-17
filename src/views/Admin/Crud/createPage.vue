<template>
  <form class="pa-5">
    <v-card-title class="pa-0">Create a new item</v-card-title>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="description"
      :error-messages="descriptionErrors"
      :counter="100"
      label="Description"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-row class="ma-0">
      <v-list-item-avatar
        tile
        size="120"
        color="grey"
      >
      <img v-if="imgLink.length > 0" :src="imgLink" alt="Product image">
      </v-list-item-avatar>
      <v-text-field
      v-model="imgLink"
      :error-messages="imgLinkErrors"
      label="Image link"
      required
      @input="$v.imgLink.$touch()"
      @blur="$v.imgLink.$touch()"
    ></v-text-field>
    </v-row>

    <v-row class="ma-0">
      <v-text-field
        class="mr-5"
        v-model="price"
        :error-messages="priceErrors"
        label="Price"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>
        <v-select
          v-model="select"
          :hint="`${select.currency}`"
          :items="currencyTypes"
          item-text="currency"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
    </v-row>

    <v-row class="ma-0">
      <v-select
      v-model="category"
      :items="categories"
      item-text="category"
      label="Category"
      persistent-hint
      return-object
      single-line
    ></v-select>
    </v-row>
    <v-btn
      class="mr-4"
      @click="submit"
      color="success"
    >
      submit
      <v-icon> mdi-plus-circle-outline </v-icon>
    </v-btn>
    <v-btn @click="clear">
      clear
      <v-icon>mdi-autorenew</v-icon>
    </v-btn>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { validationMixin } from 'vuelidate';
import { required, maxLength, url, numeric } from 'vuelidate/lib/validators';

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) },
    description: { required, maxLength: maxLength(100) },
    imgLink: { required, url },
    select: { required },
    price: { required, numeric },
    category: { required }
  },
  data() {
    return {
      categories: ['Food', 'Toys', 'Health'],
      category: 'Food',
      currencyTypes: [
        { currency: '₽' },
        { currency: '$' }
      ],
      name: '',
      description: '',
      imgLink: '',
      select: { currency: '₽' },
      price: 0
    }
  },
  computed: {
    selectErrors () {
      const errors: Array<string> = []
      if (!this.$v.select.$dirty) return errors
      !this.$v.select.required && errors.push('Item is required')
      return errors
    },
    nameErrors () {
      const errors: Array<string> = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    descriptionErrors () {
      const errors: Array<string> = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('Description must be at most 10 characters long')
      !this.$v.description.required && errors.push('Description is required.')
      return errors
    },
    imgLinkErrors() {
      const errors: Array<string> = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.url && errors.push('This field should be url type.')
      !this.$v.description.required && errors.push('Url to image is required.')
      return errors
    },
    priceErrors() {
      const errors: Array<string> = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.numeric && errors.push('This field should be numeric.')
      !this.$v.price.required && errors.push('This field is required.')
      return errors
    }
  },
  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.description = ''
      this.select = { currency: '$' },
      this.imgLink = ''
      this.price = 0;
    },
  },
})
</script>

<style>

</style>
