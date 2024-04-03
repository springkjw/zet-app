import {useQuery} from '@tanstack/react-query';

import {fetchShopBrands} from '@services';

export default function useService() {
  const {data} = useQuery({
    queryKey: ['brandShop'],
    queryFn: fetchShopBrands,
    initialData: [],
  });

  return {brands: data};
}
