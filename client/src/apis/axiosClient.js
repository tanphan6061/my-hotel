import axios from 'axios';

const API_ENDPOINT = 'https://my-hotel-api-v1.herokuapp.com/api';

class AxiosClient {
  constructor() {
    const instance = axios.create({
      baseURL: API_ENDPOINT,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('accessToken') || '';
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url, body) {
    return this.instance.delete(url, { data: body });
  }
}

export default new AxiosClient();
