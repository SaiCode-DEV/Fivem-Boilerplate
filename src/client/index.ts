import Config from '@common/config';
import { Greetings } from '@common/index';
import { ResourceName } from '@common/resource';

Greetings();

onNet(`${ResourceName}:openNui`, (page?: string) => {
  SetNuiFocus(true, true);

  SendNUIMessage({
    action: 'setVisible',
    data: {
      visible: true,
      page: page || '/',
    },
  });
});

RegisterCommand(
  `${ResourceName}:openNui`,
  (source: number, args: string[]) => {
    const page = args?.[0] || '/';
    SetNuiFocus(true, true);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: true,
        page: page,
      },
    });
  },
  false,
);

onNet(`${ResourceName}:closeNui`, () => {
  SetNuiFocus(false, false);

  SendNUIMessage({
    action: 'setVisible',
    data: {
      visible: false,
    },
  });
});

RegisterCommand(
  `${ResourceName}:closeNui`,
  (source: number) => {
    SetNuiFocus(false, false);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: false,
      },
    });
  },
  false,
);

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

// Counter system
RegisterNuiCallback('getCounter', (data: null, cb: (data: unknown) => void) => {
  emitNet(`${ResourceName}:getCounter`);
  cb({ ok: true });
});

RegisterNuiCallback('incrementCounter', (data: null, cb: (data: unknown) => void) => {
  emitNet(`${ResourceName}:incrementCounter`);
  cb({ ok: true });
});

onNet(`${ResourceName}:receiveCounter`, (counterValue: number) => {
  SendNUIMessage({
    action: 'updateCounter',
    data: {
      counter: counterValue,
    },
  });
});

// NUI Commands
RegisterCommand(
  'openNui',
  (source: number, args: string[]) => {
    const page = args?.[0] || '/';
    SetNuiFocus(true, true);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: true,
        page: page,
      },
    });
  },
  false,
);

RegisterCommand(
  'closeNui',
  (source: number) => {
    SetNuiFocus(false, false);

    SendNUIMessage({
      action: 'setVisible',
      data: {
        visible: false,
      },
    });
  },
  false,
);
