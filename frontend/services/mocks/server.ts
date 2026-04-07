import './polyfills';
import { setupServer } from 'msw/native';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

if (__DEV__) {
  server.events.on('request:start', ({ request }) => {
    console.log('[MSW] Intercepted:', request.method, request.url);
  });

  server.events.on('response:mocked', ({ response }) => {
    console.log('[MSW] Mocked response:', response.status);
  });
}
