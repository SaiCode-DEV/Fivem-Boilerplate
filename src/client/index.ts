import Config from '@common/config';
import { Greetings } from '@common/index';

const resourceName = GetCurrentResourceName();
Greetings();

if (Config.EnableNuiCommand) {
  onNet(`${resourceName}:openNui`, (page?: string) => {
    SetNuiFocus(true, true);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: true,
        page: page || '/',
      },
    });
  });

  onNet(`${resourceName}:closeNui`, () => {
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

// Counter system
RegisterNuiCallback('getCounter', (data: null, cb: (data: unknown) => void) => {
  emitNet(`${resourceName}:getCounter`);
  cb({ ok: true });
});

RegisterNuiCallback('incrementCounter', (data: null, cb: (data: unknown) => void) => {
  emitNet(`${resourceName}:incrementCounter`);
  cb({ ok: true });
});

onNet(`${resourceName}:receiveCounter`, (counterValue: number) => {
  SendNUIMessage({
    action: 'updateCounter',
    data: {
      counter: counterValue,
    },
  });
});
