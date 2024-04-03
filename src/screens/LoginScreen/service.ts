import {useQueries} from '@tanstack/react-query';

import {fetchShopBrands, fetchCardBrands} from '@services';

export default function useService() {
  const [{data: shops}, {data: cards}] = useQueries({
    queries: [
      {
        queryKey: ['brandShop'],
        queryFn: fetchShopBrands,
        initialData: [],
      },
      {
        queryKey: ['brandCard'],
        queryFn: fetchCardBrands,
        initialData: [],
      },
    ],
  });

  return {shops, cards};
}
