import axios from './axios';

import type {IBrand} from '@models';

export async function fetchShopBrands(): Promise<IBrand[]> {
  try {
    return await axios.get('/brand/shop/');
  } catch (e) {
    throw e;
  }
}
