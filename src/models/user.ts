import type {IBrand} from '@models';

export interface INotification {
  hotDeal?: boolean;
  lowestPrice?: boolean;
  priceChange?: boolean;
  night?: boolean;
}

export interface IUser {
  nickname?: string | null;
  shops?: IBrand[];
  cards?: IBrand[];
  notification?: INotification;
}
