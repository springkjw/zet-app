import dayjs from 'dayjs';
import {fakerKO as faker} from '@faker-js/faker';
import {createShopBrands} from './brand';

import type {IBrand} from './brand';

export interface IItemProce {
  value: number;
  date: string;
}

export interface IItem {
  id: string;
  prices: IItemProce[];
}

export interface IItemSimple {
  id: string;
  title: string;
  isLowestPrice: boolean;
  image?: string | null;
  brands: IBrand[];
}

export function createItem(): IItem {
  return {
    id: faker.string.uuid(),
    prices: Array.from(
      {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
      function () {
        return {
          value: parseInt(
            faker.finance.amount({min: 10000, max: 20000, dec: 0}),
            10,
          ),
          date: dayjs(faker.date.recent()).format('YY.MM.DD'),
        };
      },
    ),
  };
}

export function createItemSimple(): IItemSimple {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    image: faker.image.urlLoremFlickr({category: 'food'}),
    isLowestPrice: faker.datatype.boolean(),
    brands: createShopBrands(0, 5),
  };
}

export function createItems(): IItemSimple[] {
  return Array.from(
    {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
    createItemSimple,
  );
}
