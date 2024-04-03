import {useState, useCallback} from 'react';

import LoginView from './view';
import useService from './service';

export default function LoginScreen() {
  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {brands} = useService();

  const onChangeNickname = useCallback(function (value: string) {
    setNickname(value);
  }, []);

  const onSelectBrand = useCallback(function (brandIds: string[]) {
    setSelectedBrands(function (prev) {
      const prevSet = new Set(prev);
      const newIdsSet = new Set(brandIds);

      const filteredPrev = [...prev].filter(function (brandId) {
        return !newIdsSet.has(brandId);
      });

      brandIds.forEach(function (brandId) {
        if (!prevSet.has(brandId)) {
          filteredPrev.push(brandId);
        }
      });

      return filteredPrev;
    });
  }, []);

  const onNext = useCallback(function () {
    setStep(function (prev) {
      return prev + 1;
    });
  }, []);

  return (
    <LoginView
      step={step}
      brands={brands}
      nickname={nickname}
      selectedBrands={selectedBrands}
      onChangeNickname={onChangeNickname}
      onSelectBrand={onSelectBrand}
      onNext={onNext}
    />
  );
}
