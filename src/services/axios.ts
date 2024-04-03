import {default as Axios} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {createShopBrands, createCardBrands} from '@models';

const client = Axios.create({
  baseURL: 'https://api.zetapp.com',
});

client.interceptors.response.use(function (response) {
  return response.data;
});

export const mock = new MockAdapter(client);
export default client;

mock.onGet('/brand/shop/').reply(200, createShopBrands());
mock.onGet('/brand/card/').reply(200, createCardBrands());
