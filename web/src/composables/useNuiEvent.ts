import { onMounted, onUnmounted } from 'vue';

type MessageHandler<T = any> = (data: T) => void;

interface NuiMessage<T = any> {
  action: string;
  data: T;
}

/**
 * A composable to listen for NUI messages
 * @param action - The action to listen for
 * @param handler - The handler function to call when the action is received
 */
export function useNuiEvent<T = any>(action: string, handler: MessageHandler<T>) {
  const eventListener = (event: MessageEvent<NuiMessage<T>>) => {
    if (event.data.action === action) {
      handler(event.data.data);
    }
  };

  onMounted(() => {
    window.addEventListener('message', eventListener);
  });

  onUnmounted(() => {
    window.removeEventListener('message', eventListener);
  });
}
