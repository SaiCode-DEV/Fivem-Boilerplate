import type { NuiCallbackResponse } from '../types';

/**
 * Send a NUI callback to the client
 */
export async function nuiCallback<T = any, R = any> (action: string, data?: T): Promise<R> {
  try {
    const response = await fetch(`https://${GetParentResourceName()}/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data || {}),
    });

    const result: NuiCallbackResponse<R> = await response.json();

    if (result.ok) {
      return result.data as R;
    }
    throw new Error(result.error || 'NUI callback failed');
  } catch (error) {
    console.error(`NUI callback error [${action}]:`, error);
    throw error;
  }
}

/**
 * Get the parent resource name
 */
function GetParentResourceName (): string {
  return (window as any).GetParentResourceName?.() || 'stockmarket';
}
