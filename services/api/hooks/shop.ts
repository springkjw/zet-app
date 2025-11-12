import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../client';
import {
  GetShopsResponseSchema,
  GetShopResponseSchema,
  ShopSchema,
  type IGetShopsResponse,
  type IGetShopResponse,
  type IShop,
} from '../schemas/shop.schema';

export const shopKeys = {
  all: ['shops'] as const,
  lists: () => [...shopKeys.all, 'list'] as const,
  list: (filters?: { limit?: number; offset?: number }) =>
    [...shopKeys.lists(), filters] as const,
  details: () => [...shopKeys.all, 'detail'] as const,
  detail: (id: string) => [...shopKeys.details(), id] as const,
};

export const useShops = (params?: { limit?: number; offset?: number }) => {
  return useQuery<IGetShopsResponse, Error>({
    queryKey: shopKeys.list(params),
    queryFn: async () => {
      const response = await apiClient.get<IGetShopsResponse>('/shops', {
        params,
      });
      return GetShopsResponseSchema.parse(response);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useShop = (id: string, enabled: boolean = true) => {
  return useQuery<IShop, Error>({
    queryKey: shopKeys.detail(id),
    queryFn: async () => {
      const response = await apiClient.get<IGetShopResponse>(`/shops/${id}`);
      return ShopSchema.parse(response.shop);
    },
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateShop = () => {
  const queryClient = useQueryClient();

  return useMutation<IShop, Error, Pick<IShop, 'name'>>({
    mutationFn: async (newShop) => {
      const response = await apiClient.post<{ shop: IShop }>(
        '/shops',
        newShop
      );
      return ShopSchema.parse(response.shop);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shopKeys.lists() });
    },
  });
};
