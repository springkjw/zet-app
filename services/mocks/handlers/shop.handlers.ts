import { http, HttpResponse, delay } from 'msw';
import { API_CONFIG } from '../../config';
import {
  generateGetShopsResponse,
  generateGetShopResponse,
  MOCK_SHOPS,
} from '../generators/shop.generator';

export const shopHandlers = [
  http.get(`${API_CONFIG.BASE_URL}/shops`, async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const offset = parseInt(url.searchParams.get('offset') || '0', 10);

    const paginatedShops = MOCK_SHOPS.slice(offset, offset + limit);

    const response = {
      shops: paginatedShops,
      total: MOCK_SHOPS.length,
    };

    return HttpResponse.json(response, { status: 200 });
  }),

  http.get(`${API_CONFIG.BASE_URL}/shops/:id`, async ({ params }) => {
    await delay(300);

    const { id } = params;

    const shop = MOCK_SHOPS.find((s) => s.id === id);

    if (!shop) {
      return HttpResponse.json({ error: 'Shop not found' }, { status: 404 });
    }

    const response = generateGetShopResponse(shop);
    return HttpResponse.json(response, { status: 200 });
  }),

  http.post(`${API_CONFIG.BASE_URL}/shops`, async ({ request }) => {
    await delay(500);

    try {
      const body = await request.json();

      if (!body || typeof body !== 'object' || !('name' in body)) {
        return HttpResponse.json(
          { error: 'Invalid request body' },
          { status: 400 }
        );
      }

      const newShop = {
        id: crypto.randomUUID(),
        name: (body as { name: string }).name,
        image: 'https://via.placeholder.com/300',
      };

      return HttpResponse.json({ shop: newShop }, { status: 201 });
    } catch (error) {
      return HttpResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }),
];
