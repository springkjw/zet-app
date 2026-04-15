import { APIError } from "@/services/api/client";
import type { TSocialProvider } from "@/services/auth-provider-matrix";

export type TProviderLoginErrorKind =
  | "cancel"
  | "sdk"
  | "backend"
  | "network"
  | "config"
  | "unsupported_platform";

export interface IProviderLoginError {
  kind: TProviderLoginErrorKind;
  provider: TSocialProvider;
  message: string;
  cause: unknown;
}

const PROVIDER_LOGIN_ERROR_MESSAGES: Record<TProviderLoginErrorKind, string> = {
  cancel: "로그인이 취소되었어요. 다시 시도해주세요.",
  sdk: "로그인을 진행하지 못했어요. 잠시 후 다시 시도해주세요.",
  backend: "로그인 처리에 실패했어요. 다시 시도해주세요.",
  network: "네트워크 연결을 확인한 뒤 다시 시도해주세요.",
  config: "로그인 설정이 올바르지 않아요. 관리자에게 문의해주세요.",
  unsupported_platform: "이 기기에서는 해당 로그인을 사용할 수 없어요.",
};

const getErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  const maybeCode = (error as { code?: unknown }).code;

  return typeof maybeCode === "string" ? maybeCode : undefined;
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  const maybeMessage = (error as { message?: unknown }).message;

  return typeof maybeMessage === "string" ? maybeMessage : undefined;
};

const isCancellationError = (error: unknown): boolean => {
  if (getErrorCode(error) === "ERR_REQUEST_CANCELED") {
    return true;
  }

  if (typeof error === "object" && error) {
    const maybeCancel = (error as { isCancel?: unknown }).isCancel;

    if (maybeCancel === true) {
      return true;
    }
  }

  const message = getErrorMessage(error)?.toLowerCase();

  return !!message && message.includes("cancel");
};

export const createProviderLoginError = (
  kind: TProviderLoginErrorKind,
  provider: TSocialProvider,
  cause: unknown
): IProviderLoginError => ({
  kind,
  provider,
  cause,
  message: PROVIDER_LOGIN_ERROR_MESSAGES[kind],
});

export const normalizeProviderLoginError = (
  error: unknown,
  provider: TSocialProvider
): IProviderLoginError => {
  if (isCancellationError(error)) {
    return createProviderLoginError("cancel", provider, error);
  }

  if (error instanceof APIError) {
    return createProviderLoginError("backend", provider, error);
  }

  if (error instanceof TypeError) {
    return createProviderLoginError("network", provider, error);
  }

  return createProviderLoginError("sdk", provider, error);
};
