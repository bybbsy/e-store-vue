import Vue from "vue";
import { Validation } from "vuelidate";
import { ValidationProperties, ValidationGroups } from "vue/types/vue";

// User to specify type of parameter this.$v
type ValidationProp = ValidationProperties<Vue> & ValidationGroups & Validation;

type formOptions<T> = {
  [K in keyof T]: {
    required: boolean,
    minLength: number
  }
}

interface SigninFormFields {
  userEmail: string,
  userPassword: string
}

interface SignupFormFields {
  firstname: string,
  lastname: string,
  userEmail: string,
  userPassword: string,
  repeatUserPassword: string
}

type SigninFormOptions = formOptions<SigninFormFields>;

type SignupFormOptions = formOptions<SignupFormFields>;

interface InputError {
  invalid: boolean,
  errorMessage: string,
  params: {
    minLength: string
  }
}

export {
  ValidationProp,
  SigninFormFields,
  SignupFormFields,
  SigninFormOptions,
  SignupFormOptions,
  InputError
}
