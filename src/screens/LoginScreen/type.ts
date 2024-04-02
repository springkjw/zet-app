export interface LoginViewProps {
  step: number;
  nickname: string;
  onChangeNickname(value: string): void;
  onNext(): void;
}
