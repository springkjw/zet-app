import {useCallback} from 'react';

import {useUser} from '@services';
import NotificationSettingView from './view';

export default function NotificationSettingScreen() {
  const {user, onMutate} = useUser();

  const onChange = useCallback(
    function (
      type: 'hotDeal' | 'lowestPrice' | 'priceChange' | 'night',
      value: boolean,
    ) {
      onMutate({
        notification: {
          ...user.notification,
          [type]: value,
        },
      });
    },
    [onMutate, user],
  );

  return (
    <NotificationSettingView data={user.notification} onChange={onChange} />
  );
}
