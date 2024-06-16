import {useRoute} from '@react-navigation/native';

import useService from './service';
import NoticeDetailView from './view';

import type {NoticeRouteProp} from './type';

export default function NoticeDetailScreen() {
  const {
    params: {id: noticeId},
  } = useRoute<NoticeRouteProp>();

  const {data} = useService(noticeId);

  return <NoticeDetailView data={data} />;
}
