import Config from '@common/config';
import { runMigrations, resetMigrations } from './migrations';
import { ResourceName } from '@common/resource';

// Run database migrations on server start
(async () => {
  try {
    await runMigrations();
  } catch (error) {
    console.error(`[${ResourceName}] Failed to run migrations. Server may not function correctly.`, error);
  }
})();

if (Config.EnableResetDBCommand) {
  RegisterCommand(
    `${ResourceName}:resetDB`,
    async (playerId: number) => {
      if (!playerId) return;

      try {
        await resetMigrations();
      } catch (error) {
        console.error('[Auction] Failed to reset migrations:', error);
      }
    },
    true,
  );
}

// Counter system with OxMySQL
onNet(`${ResourceName}:getCounter`, async () => {
  const src = source;
  const result = await exports.oxmysql.query_async(`SELECT counter_value FROM ${ResourceName}_counter LIMIT 1`);

  const counterValue = result?.[0]?.counter_value ?? 0;
  emitNet(`${ResourceName}:receiveCounter`, src, counterValue);
});

onNet(`${ResourceName}:incrementCounter`, async () => {
  await exports.oxmysql.execute_async(`UPDATE ${ResourceName}_counter SET counter_value = counter_value + 1 WHERE id = 1`);

  const result = await exports.oxmysql.query_async(`SELECT counter_value FROM ${ResourceName}_counter LIMIT 1`);

  const counterValue = result?.[0]?.counter_value ?? 0;

  // Broadcast to ALL players (-1 means all clients)
  emitNet(`${ResourceName}:receiveCounter`, -1, counterValue);
});
