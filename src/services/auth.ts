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
    function ({nickname, shops, cards}: IUser) {
      setUser({nickname, shops, cards});
      storage.set('ZetUser', JSON.stringify({nickname, shops, cards}));
    },
    [setUser, storage],
  );

  return {isLoggedIn, onMutate};
}
