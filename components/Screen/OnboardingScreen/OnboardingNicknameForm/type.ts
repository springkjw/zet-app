export interface IOnboardingNicknameFormProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
}

export interface IOnboardingNicknameFormStyle {
  hasError?: boolean;
}
