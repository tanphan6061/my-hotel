import axiosClient from './axiosClient';

const ENDPOINT = '/location';

export const getCityList = () => {
  return axiosClient.get(`${ENDPOINT}/city`);
};

export const getDistrictList = (id) => {
  return axiosClient.get(`${ENDPOINT}/city/${id}/district`);
};

export const getWardList = (id) => {
  return axiosClient.get(`${ENDPOINT}/district/${id}/ward`);
};
