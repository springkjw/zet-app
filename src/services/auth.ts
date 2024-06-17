import {useRecoilState} from 'recoil';
import {useEffect, useCallback, useMemo} from 'react';
import {useMMKV} from 'react-native-mmkv';

import {userState} from '@stores';

import type {IUser} from '@models';

export function useUser() {
  const storage = useMMKV();
  const [user, setUser] = useRecoilState(userState);

  useEffect(
    function () {
      const localUser = storage.getString('ZetUser');
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    },
    [storage, setUser],
  );

  const isLoggedIn = useMemo(
    function () {
      const localUser = storage.getString('ZetUser');
      return !!localUser || !!user.nickname;
    },
    [user, storage],
  );

  const onMutate = useCallback(
    function ({nickname, shops, cards, notification}: IUser) {
      setUser(function (prev) {
        const payload: IUser = {};
        if (nickname) {
          payload.nickname = nickname;
        }
        if (shops) {
          payload.shops = shops;
        }
        if (cards) {
          payload.cards = cards;
        }
        if (notification) {
          payload.notification = notification;
        }
        const newUser = {...prev, ...payload};
        storage.set('ZetUser', JSON.stringify(newUser));
        return newUser;
      });
    },
    [setUser, storage],
  );

  return {
    isLoggedIn,
    user,
    onMutate,
  };
}
