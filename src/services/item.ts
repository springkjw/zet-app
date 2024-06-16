import client from './axios';

import type {IItem} from '@models';

export async function fetchShopItems(): Promise<IItem[]> {
  try {
    return await client.get('/item/');
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function fetchShopItem(
  itemId: string,
  signal: AbortSignal,
): Promise<IItem> {
  try {
    return await client.get(`/item/${itemId}/`, {signal});
  } catch (e) {
    console.log(e);
    throw e;
  }
}
