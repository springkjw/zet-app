import type {INotification} from '@models';

export interface NotificationSettingViewProps {
  data: INotification | undefined;
  onChange(
    type: 'hotDeal' | 'lowestPrice' | 'priceChange' | 'night',
    value: boolean,
  ): void;
}
