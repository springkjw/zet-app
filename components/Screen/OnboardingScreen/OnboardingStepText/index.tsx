import { useMemo } from "react";

import { BaseText } from "@/components/Text";
import useStyle from "./style";

import type IOnboardingStepTextProps from "./type";

export default function OnboardingStepText({ step }: IOnboardingStepTextProps) {
  const style = useStyle();

  const stepText = useMemo(() => {
    if (step === "nickname") {
      return "1";
    } else if (step === "shop") {
      return "2";
    } else if (step === "finish") {
      return "3";
    }
  }, [step]);

  return (
    <BaseText style={style.OnboardingStepText}>{`${stepText} / 3`}</BaseText>
  );
}
