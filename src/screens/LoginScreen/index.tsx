import {useState, useCallback} from 'react';

import LoginView from './view';

export default function LoginScreen() {
  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>('');

  const onChangeNickname = useCallback(function (value: string) {
    setNickname(value);
  }, []);

  const onNext = useCallback(function () {
    setStep(function (prev) {
      return prev + 1;
    });
  }, []);

  return (
    <LoginView
      step={step}
      nickname={nickname}
      onChangeNickname={onChangeNickname}
      onNext={onNext}
    />
  );
}
