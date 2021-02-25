import axiosClient from './axiosClient';

const ENDPOINT = '/room';

// fetch room list by hotel id
export const fetchRoomList = (data) => {
  return axiosClient.get(`${ENDPOINT}/${data}`);
};

export const addRoom = (data) => {
  return axiosClient.post(`${ENDPOINT}/create`, data);
};

export const editRoom = (data) => {
  return axiosClient.put(`${ENDPOINT}/edit`, data);
};

export const deleteRoom = (data) => {
  return axiosClient.post(`${ENDPOINT}/delete`, data);
};

export const getRoomById = (data) => {
  return axiosClient.get(`${ENDPOINT}/show/${data}`);
};
