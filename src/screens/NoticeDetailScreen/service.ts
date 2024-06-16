import {useQuery} from '@tanstack/react-query';

import {fetchNotice} from '@services';

export default function useService(noticeId: string) {
  const {data} = useQuery({
    queryKey: ['Notice', noticeId],
    queryFn: function ({queryKey, signal}) {
      return fetchNotice(queryKey[1] as string, signal);
    },
  });

  return {data};
}
