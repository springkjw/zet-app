import * as AppleAuthentication from "expo-apple-authentication";

import {
  createLoginRequestPayload,
  type ILoginRequestPayload,
} from "@/services/auth-provider-matrix";
import { createProviderLoginError } from "@/services/auth/errors";

export const loginWithApple = async (
  platform: "ios"
): Promise<ILoginRequestPayload> => {
  const isAvailable = await AppleAuthentication.isAvailableAsync();

  if (!isAvailable) {
    throw createProviderLoginError(
      "sdk",
      "apple",
      new Error("Apple login is unavailable on this device")
    );
  }

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw createProviderLoginError(
      "sdk",
      "apple",
      new Error("Apple login completed without identity token")
    );
  }

  return createLoginRequestPayload({
    provider: "apple",
    credential: credential.identityToken,
    platform,
  });
};
