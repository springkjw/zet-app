import { http, HttpResponse, delay } from 'msw';
import { z, ZodError } from 'zod';
import { API_CONFIG } from '../../config';
import {
  generateLoginResponse,
  generateUser,
  generateRefreshTokenResponse,
  MOCK_USERS,
} from '../generators/auth.generator';
import {
  RefreshTokenRequestSchema,
  UpdatePreferredShopsRequestSchema,
  UpdateProfileRequestSchema,
  LoginCredentialTypeSchema,
  MobileAuthPlatformSchema,
  SocialProviderSchema,
} from '../../api/schemas/auth.schema';
import { LOGIN_PROVIDER_MATRIX } from '../../auth-provider-matrix';

const invalidRequestBody = () =>
  HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });

const StrictLoginRequestSchema = z
  .object({
    provider: SocialProviderSchema,
    credentialType: LoginCredentialTypeSchema,
    credential: z.string().min(1),
    platform: MobileAuthPlatformSchema,
  })
  .strict()
  .superRefine(({ provider, credentialType }, ctx) => {
    const expectedCredentialType = LOGIN_PROVIDER_MATRIX[provider].credentialType;

    if (credentialType !== expectedCredentialType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['credentialType'],
        message: `${provider} login requires ${expectedCredentialType}`,
      });
    }
  });

export const authHandlers = [
  http.post(`${API_CONFIG.BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500);

    try {
      const body = await request.json();
      const { provider } = StrictLoginRequestSchema.parse(body);

      const isNewUser = Math.random() > 0.5;

      const response = generateLoginResponse({
        user: generateUser({ provider }),
        isNewUser,
        onboarding: {
          hasAgreedToTerms: true,
          hasCompletedOnboarding: !isNewUser,
        },
      });

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof ZodError) {
        return invalidRequestBody();
      }

      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.post(`${API_CONFIG.BASE_URL}/auth/refresh`, async ({ request }) => {
    await delay(300);

    try {
      const body = await request.json();

      RefreshTokenRequestSchema.strict().parse(body);

      const response = generateRefreshTokenResponse();
      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof ZodError) {
        return invalidRequestBody();
      }

      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),

  http.post(`${API_CONFIG.BASE_URL}/auth/logout`, async () => {
    await delay(300);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),

  http.get(`${API_CONFIG.BASE_URL}/auth/me`, async ({ request }) => {
    await delay(200);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json(
      { user: MOCK_USERS.defaultUser },
      { status: 200 }
    );
  }),

  http.patch(
    `${API_CONFIG.BASE_URL}/auth/preferred-shops`,
    async ({ request }) => {
      await delay(300);

      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      try {
        const body = await request.json();

        const validatedBody = UpdatePreferredShopsRequestSchema.strict().parse(
          body
        );

        const updatedUser = {
          ...MOCK_USERS.defaultUser,
          preferredShopIds: validatedBody.shopIds,
        };

        return HttpResponse.json({ user: updatedUser }, { status: 200 });
      } catch (error) {
        if (error instanceof ZodError) {
          return invalidRequestBody();
        }

        return HttpResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
      }
    }
  ),

  http.patch(`${API_CONFIG.BASE_URL}/auth/me`, async ({ request }) => {
    await delay(300);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const body = await request.json();

      const validatedBody = UpdateProfileRequestSchema.strict().parse(body);

      const updatedUser = {
        ...MOCK_USERS.defaultUser,
        nickname: validatedBody.nickname,
      };

      return HttpResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
      if (error instanceof ZodError) {
        return invalidRequestBody();
      }

      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),
];
