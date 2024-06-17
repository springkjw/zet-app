import {atom} from 'recoil';

import type {IUser} from '@models';

export const DEFAULT_USER: IUser = {
  nickname: null,
  shops: [],
  cards: [],
  notification: {
    hotDeal: true,
    lowestPrice: true,
    priceChange: true,
    night: true,
  },
};

export const userState = atom({
  key: 'userState',
  default: DEFAULT_USER,
});
