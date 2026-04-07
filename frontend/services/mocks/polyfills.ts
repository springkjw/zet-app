import 'react-native-url-polyfill/auto';
import 'fast-text-encoding';

import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
import { polyfill as polyfillBase64 } from 'react-native-polyfill-globals/src/base64';

if (typeof globalThis !== 'undefined') {
  if (!globalThis.EventTarget) {
    globalThis.EventTarget = class EventTarget {
      private listeners: Map<string, Set<Function>> = new Map();

      addEventListener(type: string, callback: Function) {
        if (!this.listeners.has(type)) {
          this.listeners.set(type, new Set());
        }
        this.listeners.get(type)!.add(callback);
      }

      removeEventListener(type: string, callback: Function) {
        if (this.listeners.has(type)) {
          this.listeners.get(type)!.delete(callback);
        }
      }

      dispatchEvent(event: any) {
        if (this.listeners.has(event.type)) {
          this.listeners.get(event.type)!.forEach(callback => callback(event));
        }
        return true;
      }
    } as any;
  }

  if (!globalThis.Event) {
    globalThis.Event = class Event {
      type: string;
      constructor(type: string) {
        this.type = type;
      }
    } as any;
  }

  if (!globalThis.MessageEvent) {
    globalThis.MessageEvent = class MessageEvent extends (globalThis.Event as any) {
      data: any;
      constructor(type: string, eventInitDict?: { data?: any }) {
        super(type);
        this.data = eventInitDict?.data;
      }
    } as any;
  }

  if (!globalThis.BroadcastChannel) {
    globalThis.BroadcastChannel = class BroadcastChannel extends (globalThis.EventTarget as any) {
      name: string;
      onmessage: ((event: any) => void) | null = null;

      constructor(name: string) {
        super();
        this.name = name;
      }

      postMessage(message: any) {
        const event = new (globalThis.MessageEvent as any)('message', { data: message });
        if (this.onmessage) {
          this.onmessage(event);
        }
        this.dispatchEvent(event);
      }

      close() {}
    } as any;
  }
}

if (typeof global !== 'undefined' && !global.structuredClone) {
  global.structuredClone = function structuredClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  };
}

polyfillEncoding();
polyfillBase64();
