import dayjs from 'dayjs';
import {fakerKO as faker} from '@faker-js/faker';
import {createShopBrands, createCardBrand} from './brand';

import type {IBrand} from './brand';

export interface IItemPriceStats {
  value: number;
  date: string;
}

export interface IItemPrice {
  id: string;
  brand: IBrand | null;
  price: number;
  cardPrice: number;
  shippingPrice: number;
}

export interface IItem {
  id: string;
  image: string | null;
  categoryName: string;
  title: string;
  price: number;
  perPrice: number;
  brand: IBrand | null;
  shippingPrice: number;
  cardDiscount: number;
  hasCardDiscountCondition: boolean;
  stats: IItemPriceStats[];
  prices: IItemPrice[];
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
    image: faker.image.urlLoremFlickr({category: 'food'}),
    categoryName: faker.commerce.department(),
    title: faker.commerce.productName(),
    brand: createCardBrand(),
    price: parseInt(
      faker.finance.amount({min: 10000, max: 200000, dec: 0}),
      10,
    ),
    perPrice: parseInt(faker.finance.amount({min: 100, max: 2000, dec: 0}), 10),
    shippingPrice: parseInt(
      faker.finance.amount({min: 0, max: 10000, dec: 0}),
      10,
    ),
    cardDiscount: parseInt(
      faker.finance.amount({min: 0, max: 10000, dec: 0}),
      10,
    ),
    hasCardDiscountCondition: faker.datatype.boolean(),
    stats: Array.from(
      {length: faker.helpers.rangeToNumber({min: 0, max: 10})},
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
    prices: Array.from(
      {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
      function () {
        return {
          id: faker.string.uuid(),
          brand: createCardBrand(),
          price: parseInt(
            faker.finance.amount({min: 10000, max: 200000, dec: 0}),
            10,
          ),
          cardPrice: parseInt(
            faker.finance.amount({min: 0, max: 20000, dec: 0}),
            10,
          ),
          shippingPrice: parseInt(
            faker.finance.amount({min: 0, max: 10000, dec: 0}),
            10,
          ),
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
