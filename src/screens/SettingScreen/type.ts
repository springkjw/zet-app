export interface BaseStackParamList {
  NoticeList: {};
  NotificationSetting: {};
}

export interface NoticeListViewProps {
  nickname?: string | null;
  goToPage(page: 'notice' | 'notificationSetting'): void;
  onWithdraw(): void;
}
