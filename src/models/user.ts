import type {IBrand} from '@models';

export interface IUser {
  nickname: string | null;
  shops: IBrand[];
  cards: IBrand[];
}
