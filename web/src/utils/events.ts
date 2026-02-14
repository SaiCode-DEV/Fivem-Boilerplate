import type { NuiMessage } from '../types';

type MessageHandler<T = any> = (data: T) => void;

/**
 * Listen for NUI messages
 */
export function onNuiMessage<T = any> (action: string, handler: MessageHandler<T>) {
  window.addEventListener('message', (event: MessageEvent<NuiMessage<T>>) => {
    if (event.data.action === action) {
      handler(event.data.data);
    }
  });
}

/**
 * Send a message to close the NUI (ESC key handler)
 */
export function setupEscapeListener (action: string) {
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      fetch(`https://${GetParentResourceName()}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }).catch(() => {});
    }
  });
}

/**
 * Get the parent resource name
 */
function GetParentResourceName (): string {
  return (window as any).GetParentResourceName?.() || 'stockmarket';
}
