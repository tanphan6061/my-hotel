import axiosClient from './axiosClient';

const ENDPOINT = '/transaction';

export const createTransaction = (data) => {
  return axiosClient.post(`${ENDPOINT}/booking`, data);
};

export const getTransactionUser = () => {
  return axiosClient.get(`${ENDPOINT}/user`);
};

export const getTransactionHotel = (data) => {
  return axiosClient.get(`${ENDPOINT}/hotel/${data}`);
};

export const checkIn = ({ id, code }) => {
  return axiosClient.post(`${ENDPOINT}/check-in/${id}`, { code });
};

export const checkOut = (data) => {
  return axiosClient.get(`${ENDPOINT}/check-out/${data}`);
};
