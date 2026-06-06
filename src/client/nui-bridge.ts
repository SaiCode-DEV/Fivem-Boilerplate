const resourceName = GetCurrentResourceName();

/**
 * AUTO-FORWARDING SYSTEM
 *
 * This system eliminates boilerplate for routing events between Server <-> Client <-> NUI
 *
 * SERVER TO NUI:
 * Instead of: emitNet('resource:receiveShopData', src, data)
 * Use:        emitNet('resource:nui:receiveShopData', src, data)
 * Result:     Automatically forwarded to NUI as 'receiveShopData' action
 *
 * NUI TO SERVER:
 * Instead of: nuiCallback('getShopData', { shopId: 1 })
 * Just use:   nuiCallback('getShopData', { shopId: 1 })
 * Result:     Automatically forwarded to server event 'resource:getShopData'
 *
 * SETUP:
 * 1. Call forwardToNUI('eventName') to setup server->NUI forwarding
 * 2. Call forwardToServer('callbackName') to setup NUI->server forwarding
 */

/**
 * Forward server events to NUI automatically
 * Server sends to: 'resourceName:nui:receiveShopData'
 * NUI receives as: { action: 'receiveShopData', data: ... }
 */
export function forwardToNUI(eventSuffix: string) {
  onNet(`${resourceName}:${eventSuffix}`, (...args: any[]) => {
    SendNUIMessage({
      action: `${resourceName}:${eventSuffix}`,
      data: args.length === 1 ? args[0] : args,
    });
  });
}

/**
 * Register NUI callback that forwards to server
 * NUI calls: nuiCallback('buyItem', { itemId: 1, quantity: 2 })
 * Server receives: onNet('resourceName:buyItem', (data) => { data.itemId, data.quantity })
 */
export function forwardToServer(callbackName: string, serverEvent?: string, permissionCheck?: () => boolean) {
  RegisterNuiCallback(callbackName, (data: any, cb: (data: unknown) => void) => {
    // Check permission if provided
    if (permissionCheck && !permissionCheck()) {
      console.warn(`[StockMarket] Permission denied for callback: ${callbackName}`);
      cb({ ok: false, error: 'Permission denied' });
      return;
    }

    emitNet(`${resourceName}:${serverEvent || callbackName}`, data);
    cb({ ok: true });
  });
}
