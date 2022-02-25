import { SignupFormOptions, SigninFormOptions, SignupFormFields } from '@/types/auth';

const signinFormOptions: SigninFormOptions = {
  userEmail: {
    required: true,
    minLength: 6
  },
  userPassword: {
    required: true,
    minLength: 6
  }
}

const signupFormOptions: SignupFormOptions = {
  firstname: {
    required: true,
    minLength: 2
  },
  lastname: {
    required: true,
    minLength: 2
  },
  userEmail: {
    required: true,
    minLength: 6
  },
  userPassword: {
    required: true,
    minLength: 6
  },
  repeatUserPassword: {
    required: true,
    minLength: 6
  }
}

export {
  signinFormOptions,
  signupFormOptions
};
