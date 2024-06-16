import {default as Axios} from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  createShopBrands,
  createCardBrands,
  createItem,
  createItems,
  createNotices,
  createNotice,
} from '@models';

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
mock.onGet('/item/').reply(200, createItems());
mock.onGet(/\/item\/\w+/).reply(200, createItem());
mock.onGet('/notice/').reply(200, createNotices());
mock.onGet(/\/notice\/\w+/).reply(200, createNotice());
