import {useQuery} from '@tanstack/react-query';

import {fetchShopItems} from 'services';

export default function useService() {
  const {data} = useQuery({
    queryKey: ['shopItems'],
    queryFn: fetchShopItems,
    initialData: [],
  });

  return {data};
}
