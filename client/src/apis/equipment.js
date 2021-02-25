import axiosClient from './axiosClient';

const ENDPOINT = '/equipment';

export const fetchEquipmentList = () => {
  return axiosClient.get(`${ENDPOINT}`);
};

export const createEquipment = (data) => {
  return axiosClient.post(`${ENDPOINT}/create`, data);
};
