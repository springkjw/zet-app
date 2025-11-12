import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import {
  LoginRequestSchema,
  LoginResponseSchema,
  RefreshTokenRequestSchema,
  RefreshTokenResponseSchema,
  UpdatePreferredShopsRequestSchema,
  UpdatePreferredShopsResponseSchema,
  UserSchema,
  type ILoginRequest,
  type ILoginResponse,
  type IRefreshTokenRequest,
  type IRefreshTokenResponse,
  type IUpdatePreferredShopsRequest,
  type IUpdatePreferredShopsResponse,
  type IUser,
} from "../schemas/auth.schema";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<ILoginResponse, Error, ILoginRequest>({
    mutationFn: async (credentials) => {
      const validatedRequest = LoginRequestSchema.parse(credentials);
      const response = await apiClient.post<ILoginResponse>(
        "/auth/login",
        validatedRequest
      );
      return LoginResponseSchema.parse(response);
    },
    onSuccess: (data) => {
      apiClient.setAuthToken(data.tokens.accessToken);
      queryClient.setQueryData(authKeys.me(), data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean }, Error>({
    mutationFn: async () => {
      return await apiClient.post("/auth/logout");
    },
    onSuccess: () => {
      apiClient.setAuthToken(null);
      queryClient.clear();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation<IRefreshTokenResponse, Error, IRefreshTokenRequest>({
    mutationFn: async (request) => {
      const validatedRequest = RefreshTokenRequestSchema.parse(request);
      const response = await apiClient.post<IRefreshTokenResponse>(
        "/auth/refresh",
        validatedRequest
      );
      return RefreshTokenResponseSchema.parse(response);
    },
    onSuccess: (data) => {
      apiClient.setAuthToken(data.tokens.accessToken);
    },
  });
};

export const useMe = (enabled: boolean = true) => {
  return useQuery<IUser, Error>({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const response = await apiClient.get<{ user: IUser }>("/auth/me");
      return UserSchema.parse(response.user);
    },
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdatePreferredShops = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IUpdatePreferredShopsResponse,
    Error,
    IUpdatePreferredShopsRequest
  >({
    mutationFn: async (request) => {
      const validatedRequest = UpdatePreferredShopsRequestSchema.parse(request);
      const response = await apiClient.patch<IUpdatePreferredShopsResponse>(
        "/auth/preferred-shops",
        validatedRequest
      );
      return UpdatePreferredShopsResponseSchema.parse(response);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.me(), data.user);
    },
  });
};
