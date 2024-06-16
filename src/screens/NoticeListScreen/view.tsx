import {useCallback} from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {NoticeItem} from '@components';
import useStyle from './style';

import type {NoticeListViewProps} from './type';

export default function NoticeListView({data}: NoticeListViewProps) {
  const style = useStyle();

  const renderSeparator = useCallback(function () {
    return <View style={style.NoticetionListSeparator} />;
  }, []);

  return (
    <View style={style.NoticeListContainer}>
      <FlashList
        contentContainerStyle={style.NoticeListContentContainer}
        estimatedItemSize={80}
        data={data}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={function (item) {
          return item.id;
        }}
        renderItem={function ({item}) {
          return <NoticeItem data={item} />;
        }}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}
