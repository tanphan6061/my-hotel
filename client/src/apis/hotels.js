import axiosClient from './axiosClient';

const ENDPOINT = '/hotel';

export const fetchHotelList = () => {
  return axiosClient.get(`${ENDPOINT}`);
};

export const filterHotel = (data) => {
  return axiosClient.post(`${ENDPOINT}/filter`, data);
};

export const addHotel = (data) => {
  return axiosClient.post(`${ENDPOINT}/create`, data);
};

export const editHotel = (data) => {
  return axiosClient.put(`${ENDPOINT}/edit`, data);
};

export const deleteHotel = (data) => {
  return axiosClient.delete(`${ENDPOINT}/delete`, data);
};

export const getHotelById = (data) => {
  return axiosClient.get(`${ENDPOINT}/${data}`);
};
