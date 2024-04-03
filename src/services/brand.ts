import client from './axios';

import type {IBrand} from '@models';

export async function fetchShopBrands(): Promise<IBrand[]> {
  try {
    return await client.get('/brand/shop/');
  } catch (e) {
    console.log(e);
    throw e;
  }
}
