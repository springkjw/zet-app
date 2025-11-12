import { authHandlers } from './auth.handlers';
import { shopHandlers } from './shop.handlers';

export const handlers = [...authHandlers, ...shopHandlers];
