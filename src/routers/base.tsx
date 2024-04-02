import {createStackNavigator} from '@react-navigation/stack';
import {Image, Pressable, TouchableOpacity, View} from 'react-native';
import {useCallback} from 'react';

import {HomeScreen, ShopItemScreen} from '@screens';
import {LogoImage, UserIcon, BellIcon, TrendIcon} from '@assets';
import {useRootStyle} from './style';

const Stack = createStackNavigator();

export default function BaseRouter() {
  const style = useRootStyle();

  const renderHeaderLeft = useCallback(
    function () {
      return (
        <Pressable>
          <Image source={LogoImage} style={style.Logo} />
        </Pressable>
      );
    },
    [style],
  );

  const renderHeaderRight = useCallback(
    function () {
      return (
        <View style={style.HeaderRight}>
          <TouchableOpacity style={style.HeaderRightItem}>
            <BellIcon />
          </TouchableOpacity>
          <TouchableOpacity style={style.HeaderRightItem}>
            <TrendIcon />
          </TouchableOpacity>
          <TouchableOpacity style={style.HeaderRightItem}>
            <UserIcon />
          </TouchableOpacity>
        </View>
      );
    },
    [style],
  );

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <Stack.Screen
        name="ShopItem"
        component={ShopItemScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: renderHeaderRight,
        }}
      />
    </Stack.Navigator>
  );
}
