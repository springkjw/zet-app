import {faker} from '@faker-js/faker';

export interface IBrand {
  id: string | null;
  name: string;
  image?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export function createShopBrand(): IBrand {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    image: faker.image.urlLoremFlickr({category: 'business'}),
    backgroundColor: faker.color.rgb({format: 'hex'}),
    borderColor: faker.color.rgb({format: 'hex'}),
  };
}

export function createShopBrands(min: number = 3, max: number = 10): IBrand[] {
  return Array.from(
    {length: faker.helpers.rangeToNumber({min, max})},
    createShopBrand,
  );
}

export function createCardBrand(): IBrand {
  return {
    id: faker.string.uuid(),
    name: faker.finance.creditCardIssuer(),
    image: faker.image.urlLoremFlickr({category: 'food'}),
    backgroundColor: faker.color.rgb({format: 'hex'}),
    borderColor: faker.color.rgb({format: 'hex'}),
  };
}

export function createCardBrands(): IBrand[] {
  return Array.from(
    {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
    createCardBrand,
  );
}
