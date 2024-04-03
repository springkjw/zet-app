import {atom} from 'recoil';

import type {IUser} from '@models';

export const DEFAULT_USER: IUser = {
  nickname: null,
  shops: [],
  cards: [],
};

export const userState = atom({
  key: 'userState',
  default: DEFAULT_USER,
});
