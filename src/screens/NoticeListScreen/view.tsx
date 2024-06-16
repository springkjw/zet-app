import {useCallback} from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {NoticeItem} from '@components';
import useStyle from './style';

export default function NoticeListView() {
  const style = useStyle();

  const renderSeparator = useCallback(function () {
    return <View style={style.NoticetionListSeparator} />;
  }, []);

  return (
    <View style={style.NoticeListContainer}>
      <FlashList
        contentContainerStyle={style.NoticeListContentContainer}
        estimatedItemSize={80}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={function ({item}) {
          return <NoticeItem />;
        }}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}
