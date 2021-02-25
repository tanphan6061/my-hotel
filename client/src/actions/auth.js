import * as constants from '../constants/auth';

export const showLoading = () => {
  return {
    type: constants.SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: constants.HIDE_LOADING,
  };
};

export const checkAuth = () => {
  return {
    type: constants.CHECK_AUTH,
  };
};

export const login = (email, password, role, preURL = '/') => {
  return {
    type: constants.LOGIN,
    payload: {
      email,
      password,
      role,
      preURL,
    },
  };
};

export const loginSuccess = (data) => {
  return {
    type: constants.LOGIN_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginFail = (error) => {
  return {
    type: constants.LOGIN_FAIL,
    payload: {
      error,
    },
  };
};

export const logout = () => {
  return {
    type: constants.LOGOUT,
  };
};

export const register = (
  email,
  fullname,
  password,
  city,
  district,
  ward,
  street,
  phone,
) => {
  return {
    type: constants.REGISTER,
    payload: {
      email,
      fullname,
      password,
      city,
      district,
      ward,
      street,
      phone,
    },
  };
};

export const registerSuccess = (data) => {
  return {
    type: constants.REGISTER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const registerFail = (error) => {
  return {
    type: constants.REGISTER_FAIL,
    payload: {
      error,
    },
  };
};

export const verify = (code) => {
  return {
    type: constants.VERIFY,
    payload: {
      code,
    },
  };
};

export const verifySuccess = (data) => {
  return {
    type: constants.VERIFY_SUCCESS,
    payload: {
      data,
    },
  };
};

export const verifyFail = (error) => {
  return {
    type: constants.VERIFY_FAILL,
    payload: {
      error,
    },
  };
};

export const resendCode = () => {
  return {
    type: constants.RESEND_CODE,
  };
};

export const resendCodeSuccess = (data) => {
  return {
    type: constants.RESEND_CODE_SUCCESS,
    payload: {
      data,
    },
  };
};

export const resendCodeFail = (error) => {
  return {
    type: constants.RESEND_CODE_FAIL,
    payload: {
      error,
    },
  };
};

export const updateProfile = (profile) => {
  return {
    type: constants.UPDATE_PROFILE,
    payload: {
      profile,
    },
  };
};

export const updateProfileSuccess = (profile) => {
  return {
    type: constants.UPDATE_PROFILE_SUCCESS,
    payload: {
      profile,
    },
  };
};

export const updateProfileFail = (err) => {
  return {
    type: constants.UPDATE_PROFILE_FAIL,
    payload: {
      err,
    },
  };
};

export const changePassword = (password) => {
  return {
    type: constants.CHANGE_PASSWORD,
    payload: {
      password,
    },
  };
};

export const changePasswordSuccess = (password) => {
  return {
    type: constants.CHANGE_PASSWORD_SUCCESS,
    payload: {
      password,
    },
  };
};

export const changePasswordFail = (err) => {
  return {
    type: constants.CHANGE_PASSWORD_FAIL,
    payload: {
      err,
    },
  };
};
