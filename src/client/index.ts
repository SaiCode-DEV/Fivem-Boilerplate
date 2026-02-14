import Config from '@common/config';
import { Greetings } from '@common/index';
import { cache } from '@overextended/ox_lib/client';

Greetings();

if (Config.EnableNuiCommand) {
  onNet(`${cache.resource}:openNui`, (page?: string) => {
    SetNuiFocus(true, true);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: true,
        page: page || '/',
      },
    });
  });

  onNet(`${cache.resource}:closeNui`, () => {
    SetNuiFocus(false, false);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: false,
      },
    });
  });

  RegisterNuiCallback('exit', (data: null, cb: (data: unknown) => void) => {
    SetNuiFocus(false, false);
    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: false,
      },
    });
    cb({ ok: true });
  });
}
