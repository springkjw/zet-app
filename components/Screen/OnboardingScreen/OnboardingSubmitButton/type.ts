import type { TOnboardingStep } from "@/types";

export default interface IOnboardingSubmitButtonProps {
  step?: TOnboardingStep;
  onPress?: () => void;
}
