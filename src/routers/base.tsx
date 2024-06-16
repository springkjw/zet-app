import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Image, Pressable, View} from 'react-native';
import {useCallback} from 'react';

import {HomeScreen, ShopItemScreen, SettingScreen} from '@screens';
import {LogoImage} from '@assets';
import {Back, HeaderRight} from '@components';
import {useRootStyle} from './style';

const Stack = createStackNavigator();

export default function BaseRouter() {
  const style = useRootStyle();
  const {dispatch, canGoBack} = useNavigation();

  const renderHeaderLeft = useCallback(
    function (type: 'logo' | 'back', label?: string) {
      return (
        <View>
          {type === 'logo' && (
            <Pressable
              onPress={function () {
                if (canGoBack()) {
                  dispatch(
                    CommonActions.reset({index: 0, routes: [{name: 'Home'}]}),
                  );
                }
              }}>
              <Image source={LogoImage} style={style.Logo} />
            </Pressable>
          )}
          {type === 'back' && <Back label={label} />}
        </View>
      );
    },
    [style, dispatch, canGoBack],
  );

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerLeft: function () {
            return renderHeaderLeft('logo');
          },
          headerRight: HeaderRight,
        }}
      />
      <Stack.Screen
        name="ShopItem"
        component={ShopItemScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerLeft: function () {
            return renderHeaderLeft('back', '');
          },
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: HeaderRight,
          headerLeft: function () {
            return renderHeaderLeft('back', '내 정보');
          },
        }}
      />
    </Stack.Navigator>
  );
}
