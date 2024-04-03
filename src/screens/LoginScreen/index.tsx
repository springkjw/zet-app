import {useState, useCallback} from 'react';

import LoginView from './view';
import useService from './service';

export default function LoginScreen() {
  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>('');
  const [selectedShop, setSelectedShops] = useState<string[]>([]);
  const [selectedCard, setSelectedCards] = useState<string[]>([]);

  const {shops, cards} = useService();

  const onChangeNickname = useCallback(function (value: string) {
    setNickname(value);
  }, []);

  const onSelectShop = useCallback(function (brandIds: string[]) {
    setSelectedShops(function (prev) {
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

  const onSelectCard = useCallback(function (brandId: string) {
    setSelectedCards(function (prev) {
      if (prev.includes(brandId)) {
        return prev.filter(function (id) {
          return id !== brandId;
        });
      }
      return [...prev, brandId];
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
      shops={shops}
      cards={cards}
      nickname={nickname}
      selectedShop={selectedShop}
      selectedCard={selectedCard}
      onChangeNickname={onChangeNickname}
      onSelectShop={onSelectShop}
      onSelectCard={onSelectCard}
      onNext={onNext}
    />
  );
}
