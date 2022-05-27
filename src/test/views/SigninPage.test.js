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
import { createStore, authError, emailErrorRole, passwordErrorRole } from "../variables";
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


describe('Signing in with different credentials', () => {
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

    expect(signinButton.disabled).toBeTruthy();
  })

  // OK
  test('Login button enabled with correct data', async () => {
    const store = createStore();

    const { getByLabelText, queryByDisplayValue, findByDisplayValue, container } = render(SigninPage, {
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
    const inputPassword = getByLabelText('Password');


    await fireEvent.update(inputEmail, 'jeffery@mail.ru');

    await fireEvent.update(inputPassword, '111111');

    const loginButton = queryByDisplayValue('Sign in');

    await waitFor(() => expect(loginButton.disabled).toBeFalsy())

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
    await waitFor(() => expect(loginButton.disabled).toBeTruthy())

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



    const inputEmail = getByLabelText('E-mail');
    const inputPassword = getByLabelText('Password');

    await fireEvent.update(inputEmail, 'asaaqaszxzxc111dadas@mail.ru')

    await fireEvent.update(inputPassword, 'z1231as');

    const button = queryByDisplayValue('Sign in');

    await waitFor(() => expect(button.disabled).toBeFalsy())
    await fireEvent.click(button);

    // 1st
    const error = await findByRole(authError);

    expect(error).toBeTruthy()

    // 2nd
    // same as above
    // await waitFor(() => expect(findByRole(authError)).toBeTruthy())
  })

  // OK
  test('Signing up with right credentials wont show any error', async () => {
    initializeFirebase();

    const store = createStore();
    const { getByLabelText, queryByDisplayValue, findByRole, queryByRole } = render(SigninPage, {
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

    await fireEvent.update(inputEmail, 'admin@estore.com')

    await fireEvent.update(inputPassword, 'adminestore');

    const button = queryByDisplayValue('Sign in');

    await waitFor(() => expect(button.disabled).toBeFalsy())
    await fireEvent.click(button);

    // 1st
    await waitFor(() => expect(queryByRole(authError)).toBeFalsy())

    // 2nd
    /**
     * not the same because it can't find element by role
     * and thus it throws an error every time
     **/
    // const e = await findByRole(authError);

    // expect(e).toBeFalsy();
  })
})


describe('Testing inputs (with localization)', () => {
  // OK
  test('If e-mail input length < 6 symbols then shows an error', async () => {
    const store = createStore();

    const { getByLabelText, findByText, findByRole } = render(SigninPage, {
      i18n,
      router,
      store,
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
    })

    const inputEmail = getByLabelText(i18n.t('email'));

    await fireEvent.update(inputEmail, 'asaaq')

    const e = await findByRole('email-error');

    expect(e.innerHTML).toEqual(i18n.t('warn_min_length', { minLength: 6}))
  })

  test('If e-mail input is not of email type then shows an error', async () => {
    const store = createStore();

    const { getByLabelText, findByText, findByRole } = render(SigninPage, {
      i18n,
      router,
      store,
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
    })

    const inputEmail = getByLabelText(i18n.t('email'));

    await fireEvent.update(inputEmail, 'notemailtype')

    const e = await findByRole('email-error');

    expect(e.innerHTML).toEqual(i18n.t('warn_email_type'))
  })

  test('If e-mail input length > 6 symbols and the email type then wont show any error ', async () => {
    const store = createStore();

    const { getByLabelText, queryByRole } = render(SigninPage, {
      i18n,
      router,
      store,
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
    })

    const inputEmail = getByLabelText(i18n.t('email'));

    await fireEvent.update(inputEmail, 'emailtyperu@mail.ru');

    await waitFor(() => expect(queryByRole(emailErrorRole)).toBeFalsy())
  })
})
