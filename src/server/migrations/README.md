# Database Migrations

This folder contains database migrations that run automatically when the server starts.

## How It Works

1. **Auto-Run**: Migrations run automatically on server initialization
2. **Version Tracking**: Each migration has a unique version number
3. **One-Time Execution**: Each migration runs only once (tracked in `stockmarket_migrations` table)
4. **Sequential**: Migrations run in order from lowest to highest version

## Creating a New Migration

### Step 1: Create Migration File

Create a new file in this folder with the naming pattern: `00X_description.ts`

```typescript
export default {
  version: 2, // Increment from previous version
  name: '002_add_stocks_table',
  up: async () => {
    // Your migration code here
    await exports.oxmysql.execute_async(`
      CREATE TABLE IF NOT EXISTS stockmarket_stocks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        symbol VARCHAR(10) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  },
  down: async () => {
    // Rollback code (optional, for future use)
    await exports.oxmysql.execute_async('DROP TABLE IF EXISTS stockmarket_stocks');
  },
};
```

### Step 2: Register Migration

Add your migration to the migrations array in `index.ts`:

```typescript
import migration_001 from './001_initial_setup';
import migration_002 from './002_add_stocks_table'; // Add this

const migrations: Migration[] = [
  migration_001,
  migration_002, // Add this
];
```

### Step 3: Restart Server

The migration will run automatically on next server start!

## Migration Best Practices

- ✅ **Always increment version numbers**
- ✅ **Use descriptive names**
- ✅ **Test migrations in development first**
- ✅ **Use `IF NOT EXISTS` for table creation**
- ✅ **Make migrations idempotent when possible**
- ❌ **Never modify existing migrations once deployed**
- ❌ **Don't skip version numbers**

## Example Migrations

### Adding a Column

```typescript
export default {
  version: 3,
  name: '003_add_volume_column',
  up: async () => {
    await exports.oxmysql.execute_async(`
      ALTER TABLE stockmarket_stocks 
      ADD COLUMN IF NOT EXISTS volume INT DEFAULT 0
    `);
  },
  down: async () => {
    await exports.oxmysql.execute_async(`
      ALTER TABLE stockmarket_stocks 
      DROP COLUMN IF EXISTS volume
    `);
  },
};
```

### Adding Indexes

```typescript
export default {
  version: 4,
  name: '004_add_indexes',
  up: async () => {
    await exports.oxmysql.execute_async(`
      CREATE INDEX IF NOT EXISTS idx_symbol 
      ON stockmarket_stocks(symbol)
    `);
  },
  down: async () => {
    await exports.oxmysql.execute_async(`
      DROP INDEX IF EXISTS idx_symbol 
      ON stockmarket_stocks
    `);
  },
};
```

## Migration Status

Check server console on startup to see:

- Which migrations are pending
- Which migrations were executed
- Current migration version
