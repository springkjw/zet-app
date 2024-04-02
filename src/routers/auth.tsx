import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {WelcomeScreen, LoginScreen} from '@screens';

const Stack = createStackNavigator();

export default function AuthRouter() {
  const insets = useSafeAreaInsets();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
