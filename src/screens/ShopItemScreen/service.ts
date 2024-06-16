import {useQuery} from '@tanstack/react-query';
import {fetchShopItem} from 'services';

export default function useService(itemId: string) {
  const {data} = useQuery({
    queryKey: ['shopItem', itemId],
    queryFn: function ({queryKey, signal}) {
      return fetchShopItem(queryKey[1] as string, signal as AbortSignal);
    },
  });

  return {data};
}
