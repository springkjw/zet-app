import {faker} from '@faker-js/faker';

export interface IBrand {
  id: string | null;
  name: string;
  image?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export function createBrand(): IBrand {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    image: faker.image.url(),
    backgroundColor: faker.color.rgb({format: 'hex'}),
    borderColor: faker.color.rgb({format: 'hex'}),
  };
}

export function createBrands(): IBrand[] {
  return Array.from(
    {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
    createBrand,
  );
}
