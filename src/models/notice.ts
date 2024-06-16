import {fakerKO as faker} from '@faker-js/faker';

export interface INotice {
  id: string;
  title: string;
  content: string;
  created: string;
}

export function createNotice(): INotice {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    created: faker.date.recent().toISOString(),
  };
}

export function createNotices(): INotice[] {
  return Array.from(
    {length: faker.helpers.rangeToNumber({min: 3, max: 10})},
    createNotice,
  );
}
