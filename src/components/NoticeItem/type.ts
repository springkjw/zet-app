import type {INotice} from '@models';

export interface NoticeItemProps {
  data: INotice;
}

export interface NoticeDetailScreenParams {
  id: string;
}

export type BaseStackParamList = {
  NoticeDetail: {
    params: NoticeDetailScreenParams;
  };
};
