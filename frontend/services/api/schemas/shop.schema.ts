import { z } from "zod";

export const ShopSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  image: z.string().url(),
});

export const GetShopsResponseSchema = z.object({
  shops: z.array(ShopSchema),
  total: z.number().int().nonnegative(),
});

export const GetShopResponseSchema = z.object({
  shop: ShopSchema,
});

export type IShop = z.infer<typeof ShopSchema>;
export type IGetShopsResponse = z.infer<typeof GetShopsResponseSchema>;
export type IGetShopResponse = z.infer<typeof GetShopResponseSchema>;
