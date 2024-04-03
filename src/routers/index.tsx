import {useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useUser} from '@services';
import AuthRouter from './auth';
import BaseRouter from './base';
import {useRootStyle} from './style';

const Stack = createStackNavigator();

export default function AppRouter() {
  const style = useRootStyle();
  const {isLoggedIn} = useUser();

  const initialRouteName = useMemo(
    function () {
      if (isLoggedIn) {
        return 'BaseRouter';
      } else {
        return 'AuthRouter';
      }
    },
    [isLoggedIn],
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
