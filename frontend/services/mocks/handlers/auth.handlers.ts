import { http, HttpResponse, delay } from 'msw';
import { API_CONFIG } from '../../config';
import {
  generateLoginResponse,
  generateRefreshTokenResponse,
  MOCK_USERS,
} from '../generators/auth.generator';

export const authHandlers = [
  http.post(`${API_CONFIG.BASE_URL}/auth/login`, async ({ request }) => {
    await delay(500);

    try {
      const body = await request.json();

      if (!body || typeof body !== 'object' || !('provider' in body)) {
        return HttpResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        );
      }

      const isNewUser = Math.random() > 0.5;

      const response = generateLoginResponse({
        user: MOCK_USERS.defaultUser,
        isNewUser,
        onboarding: {
          hasAgreedToTerms: true,
          hasCompletedOnboarding: !isNewUser,
        },
      });

      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
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

      if (!body || typeof body !== 'object' || !('refreshToken' in body)) {
        return HttpResponse.json(
          { error: 'Invalid refresh token' },
          { status: 400 }
        );
      }

      const response = generateRefreshTokenResponse();
      return HttpResponse.json(response, { status: 200 });
    } catch (error) {
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

        if (!body || typeof body !== 'object' || !('shopIds' in body)) {
          return HttpResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
          );
        }

        const updatedUser = {
          ...MOCK_USERS.defaultUser,
          preferredShopIds: body.shopIds,
        };

        return HttpResponse.json({ user: updatedUser }, { status: 200 });
      } catch (error) {
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

      if (!body || typeof body !== 'object' || !('nickname' in body)) {
        return HttpResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        );
      }

      const updatedUser = {
        ...MOCK_USERS.defaultUser,
        nickname: body.nickname,
      };

      return HttpResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),
];
