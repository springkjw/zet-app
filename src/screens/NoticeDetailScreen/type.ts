import type {RouteProp, ParamListBase} from '@react-navigation/native';
import type {INotice} from '@models';

export interface NoticeDetailViewProps {
  data?: INotice;
}

export interface NoticeScreenParams {
  id: string;
}

export interface NoticeRouteProp extends RouteProp<ParamListBase> {
  params: NoticeScreenParams;
}

export type BasetackParamList = {};
