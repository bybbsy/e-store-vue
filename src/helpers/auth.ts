import firebase from "firebase/compat";
import { ValidationProp } from "@/types/auth";
import { SignupFormOptions, SigninFormOptions, SignupFormFields } from '@/types/auth';

function userIsAuthorized(): (string | null) {
  return firebase.auth().currentUser?.uid ?? null;
}

function validateEmail($v: ValidationProp, authFormOptions: SignupFormOptions | SigninFormOptions) {
  const length = $v.userEmail.$model.length;
  const minLength = authFormOptions.userEmail.minLength;

  const objError = {
    invalid: $v.userEmail.$invalid,
    errorMessage: '',
    params: {
      minLength: minLength.toString()
    }
  }

  if ($v.userEmail.$dirty && !length) {
    objError.errorMessage = 'warn_empty_field';
    return objError;
  }
  if ($v.userEmail.$dirty && length < minLength) {
    objError.errorMessage = 'warn_min_length';
    return objError;
  }
  if ($v.userEmail.$dirty && length >= minLength && !$v.userEmail.email) {
    objError.errorMessage = 'warn_email_type';
    return objError;
  }

  return objError;
}

function validatePassword($v: ValidationProp, authFormOptions: SignupFormOptions | SigninFormOptions) {
  const length = $v.userPassword.$model.length;
  const minLength = authFormOptions.userEmail.minLength;

  const objError = {
    invalid: $v.userPassword.$invalid,
    errorMessage: '',
    params: {
      minLength: minLength.toString()
    }
  }

  if ($v.userPassword.$dirty && !length) {
    objError.errorMessage = 'warn_empty_field';
    return objError;
  }
  if ($v.userPassword.$dirty && length < minLength) {
    objError.errorMessage = 'warn_min_length';
    return objError;
  }

  return objError;
}

function validateName($v: ValidationProp, authFormOptions: SignupFormOptions, field: keyof SignupFormFields) {
  const length = $v[field].$model.length
  const minLength = authFormOptions[field].minLength;

  const objError = {
    invalid: $v[field].$invalid,
    errorMessage: '',
    params: {
      minLength: minLength.toString()
    }
  }

  if ($v[field].$dirty && !length) {
    objError.errorMessage = 'warn_empty_field';
    return objError;
  }
  if ($v[field].$dirty && length < minLength) {
    objError.errorMessage = `warn_min_length`;
    return objError;
  }

  return objError;
}

function checkPasswords($v: ValidationProp, authFormOptions: SignupFormOptions, field: keyof SignupFormFields) {
  const length = $v[field].$model.length;
  const minLength = authFormOptions[field].minLength;

  const objError = {
    invalid: $v[field].$invalid,
    errorMessage: '',
    params: {
      minLength: minLength.toString()
    }
  }

  if ($v[field].$dirty && !length) {
    objError.errorMessage = 'warn_empty_field';
    return objError;
  }
  if ($v[field].$dirty && !$v[field].sameAsPassword) {
    objError.errorMessage = 'warn_password_is_different';
    return objError;
  }

  return objError;
}

export {
  userIsAuthorized,
  validateEmail,
  validatePassword,
  validateName,
  checkPasswords
}
