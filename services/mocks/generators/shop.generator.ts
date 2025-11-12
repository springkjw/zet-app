import { generateMock } from "@anatine/zod-mock";
import { fakerKO } from "@faker-js/faker";
import {
  ShopSchema,
  type IGetShopResponse,
  type IGetShopsResponse,
  type IShop,
} from "../../api/schemas/shop.schema";

fakerKO.seed(456);

export const generateShop = (overrides?: Partial<IShop>): IShop => {
  const mockShop = generateMock(ShopSchema, {
    stringMap: {
      name: () => fakerKO.word.noun(),
      image: () => fakerKO.image.urlLoremFlickr({ category: "business" }),
    },
  });

  return {
    ...mockShop,
    ...overrides,
  };
};

export const generateShops = (count: number = 10): IShop[] => {
  return Array.from({ length: count }, () => generateShop());
};

export const generateGetShopsResponse = (
  count: number = 10
): IGetShopsResponse => {
  const shops = generateShops(count);
  return {
    shops,
    total: shops.length,
  };
};

export const generateGetShopResponse = (shop?: IShop): IGetShopResponse => {
  return {
    shop: shop ?? generateShop(),
  };
};

export const MOCK_SHOPS = generateShops(20);
