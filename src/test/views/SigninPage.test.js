import { screen, render, fireEvent, waitFor  } from "@testing-library/vue"
import Vue from "vue";
import Vuelidate from "vuelidate";
import i18n from '../../plugins/lang/i18n';
import router from '../../router/index';
import _ from 'lodash';
import firebase from 'firebase/compat/app';
import { emptyEmail, emptyPassword } from "../../variables";
import { errorHandlerPlugin } from '../../plugins/load'
import SigninPage from '../../views/SigninPage.vue';
import { createStore } from "../variables";
import { required, decimal, email, minLength } from 'vuelidate/lib/validators'

Vue.use(errorHandlerPlugin)
Vue.use(Vuelidate);


const registeredUsers = [
  { email: 'jeff@mail.ru', password: '111111'},
  { email: 'admin@estore.com', password: 'adminestore'}
]

const signInWithEmailAndPassword = jest.fn((email, password) => {
  const useIsRegistered = registeredUsers.some(user => user.email === email && user.password === password)

  if(!useIsRegistered) {
    throw new Error("There's no such user");
  }
})

const onAuthStateChanged = jest.fn()

const initializeFirebase = jest
  .spyOn(firebase, 'initializeApp')
  .mockImplementation(() => {
    return {
      auth: () => {
        return {
          signInWithEmailAndPassword
        }
      }
    }
  })

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    onAuthStateChanged,
    signInWithEmailAndPassword
  }
})


describe.only('Signing in with different credentials', () => {
  // OK
  test('Login button disabled witn no data ', async () => {

    const store = createStore();


    const { getByRole, getByDisplayValue } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      }
    })

    const signinButton = getByDisplayValue('Sign in');

    await fireEvent.click(signinButton);

    expect(signinButton.disabled).toBeTruthy();
  })

  // OK
  test('Login button enabled with correct data', async () => {
    const store = createStore();

    const { getByLabelText, queryByDisplayValue, findByDisplayValue } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      },
      // validations: {
      //   number: {
      //     decimal
      //   },
      //   userEmail: {
      //     required,
      //     email,
      //     minLength: minLength(6)
      //   },
      //   userPassword: {
      //     required,
      //     minLength: minLength(6)
      //   }
      // },
    })

    const inputEmail = getByLabelText('E-mail');
    const inputPassword = getByLabelText('Password');


    await fireEvent.update(inputEmail, 'jeffery@mail.ru');
    await fireEvent.update(inputPassword, '111111');

    const loginButton = queryByDisplayValue('Sign in');
    // await fireEvent.click(loginButton);

    await waitFor(() => {
      expect(loginButton.disabled).toBeFalsy();
    })
  })

  // OK
  test('Login button disabled with only e-mail', async () => {
    const store = createStore();

    const { getByLabelText, queryByDisplayValue, container } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      }
    })

    const inputEmail = getByLabelText('E-mail');

    await fireEvent.update(inputEmail, 'jeffery@mail.ru');

    const loginButton = queryByDisplayValue('Sign in');
    expect(loginButton.disabled).toBeTruthy();
  })

  // OK
  test('Signing up with wrong credentials throws an error', async () => {
    initializeFirebase();

    const store = createStore();
    const { getByLabelText, queryByDisplayValue, findByRole, findByText,queryByRole, container } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      }
    })


    // Need to comment debounce part
    const inputEmail = getByLabelText('E-mail');
    const inputPassword = getByLabelText('Password');

    await fireEvent.touch(inputEmail);
    await fireEvent.update(inputEmail, 'asaaqaszxzxc111dadas@mail.ru')

    await fireEvent.touch(inputPassword);
    await fireEvent.update(inputPassword, 'z1231as');

    const button = queryByDisplayValue('Sign in');

    await waitFor(() => expect(button.disabled).toBeFalsy())
    await fireEvent.click(button);

    const error = await findByRole('auth-error');

    expect(error).toBeTruthy();
  })

  // OK
  test('Signing up with right credentials wont show any error', async () => {
    initializeFirebase();

    const store = createStore();
    const { getByLabelText, queryByDisplayValue, findByRole, findByText,queryByRole, container } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      }
    })


    // Need to comment debounce part
    const inputEmail = getByLabelText('E-mail');
    const inputPassword = getByLabelText('Password');

    // await fireEvent.touch(inputEmail);
    await fireEvent.update(inputEmail, 'admin@estore.com')

    // await fireEvent.touch(inputPassword);
    await fireEvent.update(inputPassword, 'adminestore');

    const button = queryByDisplayValue('Sign in');

    await waitFor(() => expect(button.disabled).toBeFalsy())
    await fireEvent.click(button);

    await waitFor(() => expect(queryByRole('auth-error')).toBeFalsy())

  })
})


describe('Testing inputs', () => {
  // OK
  test('If e-mail length < 6 symbols then shows an error', async () => {
    const store = createStore();

    const { getByLabelText, findByText } = render(SigninPage, {
      router,
      store,
      i18n,
      data: function() {
        return {
          userEmail: '',
          userPassword: '',
          number: '',
          emailValid: emptyEmail,
          passwordValid: emptyPassword,
          authError: ''
        }
      },
      validations: {
        number: {
          decimal
        },
        userEmail: {
          required,
          email,
          minLength: minLength(6)
        },
        userPassword: {
          required,
          minLength: minLength(6)
        }
      },
    })

    const inputEmail = getByLabelText('E-mail');

    await fireEvent.touch(inputEmail);
    await fireEvent.update(inputEmail, 'asaaq',)

    const e = await findByText('Min length: 6.');

    expect(e).toBeTruthy();
  })
})
