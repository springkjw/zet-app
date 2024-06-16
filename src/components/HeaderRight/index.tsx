import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {BellIcon, TrendIcon, UserIcon} from '@assets';

import useStyle from './style';

import type {StackNavigationProp} from '@react-navigation/stack';
import type {BaseRouterParamList, HeaderRightProps} from './type';

export default function HeaderRight({
  hasNotice = true,
  hasTrend = true,
  hasSetting = true,
}: HeaderRightProps) {
  const style = useStyle();
  const {navigate} = useNavigation<StackNavigationProp<BaseRouterParamList>>();

  return (
    <View style={style.HeaderRight}>
      {hasNotice && (
        <TouchableOpacity style={style.HeaderRightItem}>
          <BellIcon size={20} />
        </TouchableOpacity>
      )}
      {hasTrend && (
        <TouchableOpacity style={style.HeaderRightItem}>
          <TrendIcon size={20} />
        </TouchableOpacity>
      )}
      {hasSetting && (
        <TouchableOpacity
          onPress={function () {
            navigate('Setting');
          }}
          style={style.HeaderRightItem}>
          <UserIcon size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}
