import { toast } from 'react-toastify';

import * as constants from '../constants/auth';

const initalState = {
  loading: false,
  auth: !!localStorage.getItem('accessToken'),
  verify: '',
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {},
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case constants.CHECK_AUTH: {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) return { ...state, auth: true };
      return {
        ...state,
        auth: false,
      };
    }

    case constants.LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.LOGIN_SUCCESS: {
      const { data } = action.payload;
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Login success');
      return {
        ...state,
        auth: true,
        loading: false,
        userInfo: data,
      };
    }

    case constants.LOGIN_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.LOGOUT: {
      localStorage.clear();
      toast.success('Logout success');
      return {
        ...state,
        auth: false,
        userInfo: {},
      };
    }

    case constants.REGISTER: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.REGISTER_SUCCESS: {
      const { data } = action.payload;
      localStorage.setItem('username', data.username);
      return {
        ...state,
        loading: false,
        verify: data.email,
      };
    }

    case constants.REGISTER_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.VERIFY: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.VERIFY_SUCCESS: {
      const { data } = action.payload;
      localStorage.clear();
      localStorage.setItem('accessToken', data.accessToken);
      return {
        ...state,
        auth: true,
        verify: '',
        loading: false,
      };
    }

    case constants.VERIFY_FAILL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.RESEND_CODE: {
      return {
        ...state,
        loading: true,
      };
    }

    case constants.RESEND_CODE_SUCCESS: {
      const { message } = action.payload;
      toast.success(message);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.RESEND_CODE_FAIL: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        loading: false,
      };
    }

    case constants.UPDATE_PROFILE:
      return { ...state };
    case constants.UPDATE_PROFILE_SUCCESS: {
      const { profile } = action.payload;
      state.userInfo = profile.data.user;
      localStorage.setItem('userInfo', JSON.stringify(profile.data.user));
      return { ...state };
    }
    case constants.UPDATE_PROFILE_FAIL: {
      return { ...state };
    }

    case constants.CHANGE_PASSWORD:
      return { ...state };
    case constants.CHANGE_PASSWORD_SUCCESS: {
      return { ...state };
    }
    case constants.CHANGE_PASSWORD_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
