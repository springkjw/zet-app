import {useQuery} from '@tanstack/react-query';

import {fetchNotices} from '@services';

export default function useService() {
  const {data} = useQuery({
    queryKey: ['Notices'],
    queryFn: function ({signal}) {
      return fetchNotices(signal);
    },
    initialData: [],
  });

  return {data};
}
