import axiosClient from './axiosClient';

const ENDPOINT = '/auth';

export const login = (data) => {
  return axiosClient.post(`${ENDPOINT}/login`, data);
};

export const logout = (data) => {
  return axiosClient.post(`${ENDPOINT}/logout`, data);
};

export const register = (data) => {
  return axiosClient.post(`${ENDPOINT}/register`, data);
};

export const verify = (data) => {
  return axiosClient.post(`${ENDPOINT}/verify`, data);
};

export const resendCode = (data) => {
  return axiosClient.post(`${ENDPOINT}/resend-mail-verify`, data);
};

export const updateProfile = (data) => {
  return axiosClient.post('/user/update-profile', data);
};

export const changePassword = (data) => {
  return axiosClient.post('/user/change-password', data);
};
