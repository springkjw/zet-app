import client from './axios';

import type {INotice} from '@models';

export async function fetchNotices(signal: AbortSignal): Promise<INotice[]> {
  try {
    return await client.get('/notice/', {signal});
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function fetchNotice(noticeId: string): Promise<INotice> {
  try {
    return await client.get(`/notice/${noticeId}/`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
