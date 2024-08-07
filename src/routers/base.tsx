import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Image, Pressable, View} from 'react-native';
import {useCallback} from 'react';

import {
  HomeScreen,
  ShopItemScreen,
  SettingScreen,
  NoticeListScreen,
  NoticeDetailScreen,
  NotificationSettingScreen,
} from '@screens';
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
          headerRight: function () {
            return <HeaderRight />;
          },
        }}
      />
      <Stack.Screen
        name="ShopItem"
        component={ShopItemScreen}
        options={{
          headerStyle: style.Header,
          headerTransparent: true,
          title: '',
          headerLeft: function () {
            return renderHeaderLeft('back', '');
          },
          headerRight: function () {
            return <HeaderRight />;
          },
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: function () {
            return <HeaderRight />;
          },
          headerLeft: function () {
            return renderHeaderLeft('back', '내 정보');
          },
        }}
      />
      <Stack.Screen
        name="NoticeList"
        component={NoticeListScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: function () {
            return <HeaderRight hasSetting={false} />;
          },
          headerLeft: function () {
            return renderHeaderLeft('back', '공지사항');
          },
        }}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetailScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: function () {
            return <HeaderRight hasSetting={false} />;
          },
          headerLeft: function () {
            return renderHeaderLeft('back', '');
          },
        }}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSettingScreen}
        options={{
          headerStyle: style.Header,
          title: '',
          headerRight: function () {
            return <HeaderRight hasSetting={false} />;
          },
          headerLeft: function () {
            return renderHeaderLeft('back', '가격 알림 설정');
          },
        }}
      />
    </Stack.Navigator>
  );
}
