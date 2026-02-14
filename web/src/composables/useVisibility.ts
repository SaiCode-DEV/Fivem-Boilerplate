import type { SetVisibleData } from '../types';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NuiActions } from '../types';
import { isDevelopment, onNuiMessage } from '../utils';

const isVisible = ref(isDevelopment());

/**
 * Composable for managing UI visibility
 */
export function useVisibility () {
  const router = useRouter();

  // Listen for setVisible message from NUI
  onNuiMessage<SetVisibleData>(NuiActions.SET_VISIBLE, async data => {
    isVisible.value = data.visible;

    // Navigate to specific page if provided
    if (data.visible && data.page) {
      await router.push(data.page);
    }
    // Also notify on simple visibility change
    window.postMessage({ action: 'uiChanged' }, '*');
  });

  const show = () => {
    isVisible.value = true;
    window.postMessage({ action: 'uiChanged' }, '*');
  };

  const hide = () => {
    isVisible.value = false;
    window.postMessage({ action: 'uiChanged' }, '*');
  };

  const toggle = () => {
    isVisible.value = !isVisible.value;
    window.postMessage({ action: 'uiChanged' }, '*');
  };

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
}
