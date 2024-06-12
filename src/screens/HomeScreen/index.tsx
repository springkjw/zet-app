import useService from './service';
import HomeView from './view';

export default function HomeScreen() {
  const {data} = useService();

  return <HomeView data={data} />;
}
