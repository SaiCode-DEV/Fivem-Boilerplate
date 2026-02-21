export * from './events';
// Utility functions
export * from './nui';

/**
 * Check if we're in development mode (not in-game)
 */
export function isDevelopment(): boolean {
  return !(window as any).GetParentResourceName;
}
