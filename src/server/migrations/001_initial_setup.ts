import { ResourceName } from '@common/resource';
export default {
  version: 1,
  name: '001_initial_setup',
  up: async () => {
    await exports.oxmysql.execute_async(`
      CREATE TABLE IF NOT EXISTS ${ResourceName}_counter (
        id INT PRIMARY KEY AUTO_INCREMENT,
        counter_value INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert initial counter value if table is empty
    await exports.oxmysql.execute_async(`
      INSERT INTO ${ResourceName}_counter (counter_value) 
      SELECT 0 
      WHERE NOT EXISTS (SELECT 1 FROM ${ResourceName}_counter LIMIT 1)
    `);
  },
  down: async () => {
    await exports.oxmysql.execute_async(`DROP TABLE IF EXISTS ${ResourceName}_counter`);
  },
};
