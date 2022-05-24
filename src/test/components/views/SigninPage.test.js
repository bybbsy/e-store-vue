import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';

import i18n from '@/plugins/lang/i18n.ts';
import router from '@/router';

import { render, screen, fireEvent, getByDisplayValue, getByTestId } from "@testing-library/vue";

import SigninPage from '@/views/SigninPage.vue';
import AuthWelcome from '@/components/Auth/AuthWelcome.vue';
import { getters } from '@/store/products/getters'
import { actions } from '@/store/products/actions'
import { mutations } from "@/store/products/mutations";

import { emptyEmail, emptyPassword, inputDelay } from '@/variables';
import { first } from 'lodash';

Vue.use(Vuelidate);

function getSigningPageOptions() {
  return {
    i18n,
    router,
    data() {
      return {
        userEmail: '',
        userPassword: '',
        number: '',
        emailValid: emptyEmail,
        passwordValid: emptyPassword,
        authError: ''
      }
    },
    components: {
      AuthWelcome
    }
  }
}

test('Invalid when e-mail field is not email type and password length < 6', async () => {
  const { getByLabelText, getByText, debug } = render(SigninPage, getSigningPageOptions());

  const emailInput = getByLabelText('E-mail');
  const passwordInput = getByLabelText('Password');

  let emailErrorMessage, passwordErrorMessage;

  expect(emailInput).toBeTruthy();

  await fireEvent.update(emailInput, 'Jeffqwq');

  setTimeout(() => {
    emailErrorMessage = getByText('This field should be the email type');
    expect(emailErrorMessage).toBeTruthy();
  }, inputDelay);


  await fireEvent.update(passwordInput, 'qazx');

  setTimeout(() => {
    passwordErrorMessage = getByText('Min length: 6');
    expect(passwordErrorMessage).toBeTruthy();
  }, inputDelay);
})

test('Invalid when e-mail field is not email type and password length is 6 (Sign in button disabled)', async () => {
  const { getByLabelText, getByText, debug, container } = render(SigninPage, getSigningPageOptions());

  const emailInput = getByLabelText('E-mail');
  const passwordInput = getByLabelText('Password');
  const signinButton = container.querySelector('input[type=submit]');

  let emailErrorMessage, passwordErrorMessage;

  expect(emailInput).toBeTruthy();

  await fireEvent.update(emailInput, 'Jeffqwq');
  await fireEvent.update(passwordInput, 'qweqwe');


  setTimeout(() => {
    emailErrorMessage = getByText('This field should be the email type');
    expect(emailErrorMessage).toBeTruthy();

    passwordErrorMessage = getByText('Min length: 6');
    expect(passwordErrorMessage).not.toBeTruthy();

    expect(signinButton).toBeDisabled();
  }, inputDelay);
  // debug()
})
