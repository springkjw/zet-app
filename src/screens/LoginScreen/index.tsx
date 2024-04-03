import {useState, useCallback} from 'react';
import {useNavigation, CommonActions} from '@react-navigation/native';

import {useUser} from '@services';
import LoginView from './view';
import useService from './service';

import type {IBrand} from '@models';

export default function LoginScreen() {
  const {dispatch} = useNavigation();

  const [step, setStep] = useState<number>(1);
  const [nickname, setNickname] = useState<string>('');
  const [selectedShop, setSelectedShops] = useState<IBrand[]>([]);
  const [selectedCard, setSelectedCards] = useState<IBrand[]>([]);

  const {shops, cards} = useService();
  const {onMutate} = useUser();

  const onChangeNickname = useCallback(function (value: string) {
    setNickname(value);
  }, []);

  const onSelectShop = useCallback(function (brands: IBrand[]) {
    setSelectedShops(function (prev) {
      const prevSet = new Set(prev);
      const newIdsSet = new Set(brands);

      const filteredPrev = [...prev].filter(function (brand) {
        return !newIdsSet.has(brand);
      });

      brands.forEach(function (brand) {
        if (!prevSet.has(brand)) {
          filteredPrev.push(brand);
        }
      });

      return filteredPrev;
    });
  }, []);

  const onSelectCard = useCallback(function (brand: IBrand) {
    setSelectedCards(function (prev) {
      if (prev.includes(brand)) {
        return prev.filter(function (b) {
          return b.id !== brand.id;
        });
      }
      return [...prev, brand];
    });
  }, []);

  const onNext = useCallback(
    function () {
      console.log('STEP', step);
      if (step === 3) {
        onMutate({
          nickname,
          shops: selectedShop,
          cards: selectedCard,
        });
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BaseRouter'}],
          }),
        );
      } else {
        setStep(function (prev) {
          if (prev === 3) {
            return prev;
          }

          return prev + 1;
        });
      }
    },
    [step, onMutate, nickname, selectedShop, selectedCard, dispatch],
  );

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
