<template>
  <form class="pa-5">
    <v-card-title class="pa-0">{{ $t("admin_mi_nav_create") }}</v-card-title>
    <v-row>
      <v-col :class="getResponsiveColsTop">
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="100"
          :label="$t('admin_mi_form_name')"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>

        <v-textarea
          v-model="description"
          :error-messages="descriptionErrors"
          :counter="1000"
          :label="$t('admin_mi_form_desc')"
          required
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        >
        </v-textarea>

        <v-select
          v-model="category"
          :items="categories"
          item-text="category"
          :label="$t('admin_mi_form_category')"
          persistent-hint
          return-object
        ></v-select>
      </v-col>

      <v-col :class="getResponsiveColsTop">
        <v-list-item-avatar tile size="120" color="grey">
          <v-img
            v-if="imgLink.length > 0"
            :src="imgLink"
            alt="Product image"
            contain
          ></v-img>
        </v-list-item-avatar>
        <v-text-field
          v-model="imgLink"
          :error-messages="imgLinkErrors"
          :label="$t('admin_mi_form_img')"
          required
          @input="$v.imgLink.$touch()"
          @blur="$v.imgLink.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col :class="getResponsiveColsBottom" class="pt-0">
        <v-text-field
          v-model="price"
          :error-messages="priceErrors"
          :label="$t('admin_mi_form_price')"
          required
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
        ></v-text-field>
      </v-col>

      <v-col :class="getResponsiveColsBottom" class="pt-0 orange--text">
        <v-select
          v-model="select"
          :hint="`${select.currency}`"
          :items="getCurrencyTypes"
          item-text="currency"
          :label="$t('admin_mi_form_currency')"
          persistent-hint
          return-object
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="mx-0">
      <v-btn class="mr-4 my-2" @click="submit" color="success" large outlined>
        {{ $t("admin_mi_create_btn_submit") }}
        <v-icon> mdi-plus-circle-outline </v-icon>
      </v-btn>
      <v-btn class="my-2" @click="clear" color="primary" outlined large>
        {{ $t("admin_mi_create_btn_clear") }}
        <v-icon>mdi-autorenew</v-icon>
      </v-btn>
    </v-row>
    <v-dialog v-model="dialog.state" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ dialog.text }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import {
  required,
  maxLength,
  url,
  decimal,
  minValue,
} from "vuelidate/lib/validators";
import firebase from "firebase/compat";
import { mapGetters } from "vuex";

export default Vue.extend({
  data() {
    return {
      dialog: {
        state: false,
        text: "Adding data to firestore",
      },
      categories: ["food", "toys", "health"],
      category: "food",
      name: "",
      description: "",
      imgLink: "",
      select: { currency: "₽" },
      price: 0,
    };
  },
  validations: {
    name: { required, maxLength: maxLength(100) },
    description: { required, maxLength: maxLength(1000) },
    imgLink: { required, url },
    select: { required },
    price: { required, decimal, minValue: minValue(0.1) },
    category: { required },
  },
  computed: {
    ...mapGetters(["getCurrencyTypes"]),
    getResponsiveColsBottom() {
      let cols = "col-";
      if (this.$vuetify.breakpoint.mobile) {
        return cols + 12;
      }
      return cols + 3;
    },
    getResponsiveColsTop() {
      let cols = "col-";
      if (this.$vuetify.breakpoint.mobile) {
        return cols + 12;
      }
      return cols + 6;
    },
    selectErrors() {
      const errors: Array<string> = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors: Array<string> = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    descriptionErrors() {
      const errors: Array<string> = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.maxLength &&
        errors.push("Description must be at most 10 characters long");
      !this.$v.description.required && errors.push("Description is required.");
      return errors;
    },
    imgLinkErrors() {
      const errors: Array<string> = [];
      if (!this.$v.imgLink.$dirty) return errors;
      !this.$v.imgLink.url && errors.push("This field should be url type.");
      !this.$v.imgLink.required && errors.push("Url to image is required.");
      return errors;
    },
    priceErrors() {
      const errors: Array<string> = [];
      if (!this.$v.price.$dirty) return errors;
      !this.$v.price.decimal && errors.push("This field should be decimal.");
      !this.$v.price.minValue &&
        errors.push("This field should have a value at least 0.1");
      !this.$v.price.required && errors.push("This field is required.");
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.dialog.state = true;

        const collectionRef = firebase.firestore().collection("products");

        const formData = {
          name: this.name,
          description: this.description,
          category: this.category,
          price: Number(this.price),
          currency: this.select.currency,
          imgLink: this.imgLink,
          rate: 0,
        };

        const a = await collectionRef.add(formData);
        // .catch(e => {
        //   this.dialog.state = true;
        //   this.dialog.text = e
        // });

        // https://toppng.com/uploads/preview/salad-with-chicken-png-chicken-caesar-salad-11563252871hjg6nsyeid.png

        // const collectionRef = firebase.firestore().collection('products');
        this.dialog.state = false;
        this.clear();
        return;
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.description = "";
      (this.select = { currency: "$" }), (this.imgLink = "");
      this.price = 0;
    },
  },
});
</script>

<style>
</style>
