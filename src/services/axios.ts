import {default as Axios} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {createBrands} from '@models';

const client = Axios.create({
  baseURL: 'https://api.zetapp.com',
});

client.interceptors.response.use(function (response) {
  return response.data;
});

export const mock = new MockAdapter(client);
export default client;

mock.onGet('/brand/shop/').reply(200, createBrands());
