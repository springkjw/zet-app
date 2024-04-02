import {useMemo} from 'react';
import {useMMKV} from 'react-native-mmkv';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import AuthRouter from './auth';
import BaseRouter from './base';
import {useRootStyle} from './style';

const Stack = createStackNavigator();

export default function AppRouter() {
  const style = useRootStyle();
  const storage = useMMKV();

  const initialRouteName = useMemo(
    function () {
      const access = storage.getString('access');

      return 'AuthRouter';

      if (access) {
        return 'BaseRouter';
      } else {
        return 'AuthRouter';
      }
    },
    [storage],
  );

  return (
    <GestureHandlerRootView style={style.GestureView}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="AuthRouter"
          component={AuthRouter}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BaseRouter"
          component={BaseRouter}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
