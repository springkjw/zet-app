import {useState, useCallback, useEffect} from 'react';
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
  const {user, onMutate} = useUser();

  useEffect(
    function () {
      if (!!user.isFinished) {
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BaseRouter'}],
          }),
        );
      } else {
        if (!user.nickname) {
          setStep(1);
        } else if (user.shops.length === 0) {
          setStep(2);
        } else if (user.cards.length === 0) {
          setStep(3);
        }
      }
    },
    [user, dispatch],
  );

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
      if (step === 3) {
        onMutate({cards: selectedCard});
        dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BaseRouter'}],
          }),
        );
      } else {
        if (step === 1) {
          onMutate({nickname});
        } else if (step === 2) {
          onMutate({shops: selectedShop});
        }

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
