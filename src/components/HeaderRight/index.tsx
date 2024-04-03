import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BellIcon, TrendIcon, UserIcon} from '@assets';

import useStyle from './style';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {BaseRouterParamList} from './type';

export default function HeaderRight() {
  const style = useStyle();
  const {navigate} = useNavigation<StackNavigationProp<BaseRouterParamList>>();

  return (
    <View style={style.HeaderRight}>
      <TouchableOpacity style={style.HeaderRightItem}>
        <BellIcon />
      </TouchableOpacity>
      <TouchableOpacity style={style.HeaderRightItem}>
        <TrendIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={function () {
          navigate('Setting');
        }}
        style={style.HeaderRightItem}>
        <UserIcon />
      </TouchableOpacity>
    </View>
  );
}
