import {default as Axios} from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const instance = Axios.create({});

instance.interceptors.response.use(function (response) {
  return response.data;
});

export const mock = new MockAdapter(instance);
