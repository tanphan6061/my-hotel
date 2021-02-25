import axiosClient from './axiosClient';

const ENDPOINT = '/user';

export const fetchUserList = () => {
  return axiosClient.get(`${ENDPOINT}/getAllUser`);
};

export const setRoleUser = (data) => {
  return axiosClient.post(`${ENDPOINT}/updateRoleUser`, data);
};
