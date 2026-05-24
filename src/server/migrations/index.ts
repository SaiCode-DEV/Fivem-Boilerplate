import migration_001 from './001_initial_setup';
import { ResourceName } from '@common/resource';

interface Migration {
  version: number;
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

// Register all migrations in order
const migrations: Migration[] = [
  migration_001,
  // Add new migrations here as you create them
];

/**
 * Ensures the migrations tracking table exists
 */
async function ensureMigrationsTable(): Promise<void> {
  await exports.oxmysql.execute_async(`
    CREATE TABLE IF NOT EXISTS ${ResourceName}_migrations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      version INT NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

/**
 * Gets all executed migration versions from the database
 */
async function getExecutedMigrations(): Promise<number[]> {
  const result = await exports.oxmysql.query_async(`SELECT version FROM ${ResourceName}_migrations ORDER BY version ASC`);
  return result?.map((row: any) => row.version) ?? [];
}

/**
 * Records a migration as executed
 */
async function recordMigration(migration: Migration): Promise<void> {
  await exports.oxmysql.execute_async(`INSERT INTO ${ResourceName}_migrations (version, name) VALUES (?, ?)`, [
    migration.version,
    migration.name,
  ]);
}

/**
 * Runs all pending migrations
 */
export async function runMigrations(): Promise<void> {
  console.log(`[${ResourceName}] Checking database migrations...`);

  try {
    // Ensure migrations tracking table exists
    await ensureMigrationsTable();

    // Get executed migrations
    const executedVersions = await getExecutedMigrations();

    // Find pending migrations
    const pendingMigrations = migrations.filter((migration) => !executedVersions.includes(migration.version));

    if (pendingMigrations.length === 0) {
      console.log(`[${ResourceName}] All migrations are up to date!`);
      return;
    }

    console.log(`[${ResourceName}] Found ${pendingMigrations.length} pending migration(s)`);

    // Execute pending migrations
    for (const migration of pendingMigrations) {
      console.log(`[${ResourceName}] Running migration: ${migration.name} (v${migration.version})`);

      try {
        await migration.up();
        await recordMigration(migration);
        console.log(`[${ResourceName}] ✓ Migration ${migration.name} completed successfully`);
      } catch (error) {
        console.error(`[${ResourceName}] ✗ Migration ${migration.name} failed:`, error);
        throw error;
      }
    }

    console.log(`[${ResourceName}] All migrations completed successfully!`);
  } catch (error) {
    console.error(`[${ResourceName}] Migration error:`, error);
    throw error;
  }
}

/**
 * Gets the current migration version
 */
export async function getCurrentVersion(): Promise<number> {
  const executedVersions = await getExecutedMigrations();
  return executedVersions.length > 0 ? Math.max(...executedVersions) : 0;
}

/**
 * Resets all migrations by rolling back and clearing the migrations table
 */
export async function resetMigrations(): Promise<void> {
  console.log(`[${ResourceName}] Resetting database migrations...`);

  try {
    // Get executed migrations in reverse order to rollback
    const executedVersions = await getExecutedMigrations();
    const executedMigrations = migrations
      .filter((migration) => executedVersions.includes(migration.version))
      .reverse();

    // Rollback each migration
    for (const migration of executedMigrations) {
      console.log(`[${ResourceName}] Rolling back migration: ${migration.name} (v${migration.version})`);

      try {
        await migration.down();
        console.log(`[${ResourceName}] ✓ Migration ${migration.name} rolled back successfully`);
      } catch (error) {
        console.error(`[${ResourceName}] ✗ Migration ${migration.name} rollback failed:`, error);
        throw error;
      }
    }

    // Clear migrations table
    await exports.oxmysql.execute_async(`TRUNCATE TABLE ${ResourceName}_migrations`);
    console.log(`[${ResourceName}] All migrations have been reset successfully!`);
  } catch (error) {
    console.error(`[${ResourceName}] Migration reset error:`, error);
    throw error;
  }
}
