import Config from '@common/config';
import { addCommand, cache } from '@overextended/ox_lib/server';
import { runMigrations } from './migrations';

// Run database migrations on server start
(async () => {
  try {
    await runMigrations();
  } catch (error) {
    console.error('[StockMarket] Failed to run migrations. Server may not function correctly.');
  }
})();

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

// Counter system with OxMySQL
onNet(`${cache.resource}:getCounter`, async () => {
  const src = source;
  const result = await exports.oxmysql.query_async(
    'SELECT counter_value FROM stockmarket_counter LIMIT 1'
  );
  
  const counterValue = result?.[0]?.counter_value ?? 0;
  emitNet(`${cache.resource}:receiveCounter`, src, counterValue);
});

onNet(`${cache.resource}:incrementCounter`, async () => {
  await exports.oxmysql.execute_async(
    'UPDATE stockmarket_counter SET counter_value = counter_value + 1 WHERE id = 1'
  );
  
  const result = await exports.oxmysql.query_async(
    'SELECT counter_value FROM stockmarket_counter LIMIT 1'
  );
  
  const counterValue = result?.[0]?.counter_value ?? 0;
  
  // Broadcast to ALL players (-1 means all clients)
  emitNet(`${cache.resource}:receiveCounter`, -1, counterValue);
});
