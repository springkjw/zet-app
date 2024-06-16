import useService from './service';
import NoticeListView from './view';

export default function NoticeListScreen() {
  const {data} = useService();

  return <NoticeListView data={data} />;
}
