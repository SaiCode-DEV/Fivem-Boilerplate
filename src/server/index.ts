import Config from '@common/config';
import { Greetings } from '@common/index';
import { addCommand, cache } from '@overextended/ox_lib/server';

Greetings();

if (Config.EnableNuiCommand) {
  addCommand('openNui', async (playerId, args) => {
    if (!playerId) return;

    const page = args?.[0];
    emitNet(`${cache.resource}:openNui`, playerId, page);
  });

  addCommand('closeNui', async (playerId) => {
    if (!playerId) return;

    emitNet(`${cache.resource}:closeNui`, playerId);
  });
}
