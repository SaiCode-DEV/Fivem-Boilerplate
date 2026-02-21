/**
 * Migration Template
 *
 * Copy this file and rename it with the next version number
 * Example: 002_add_new_table.ts
 */

export default {
  version: 999, // CHANGE THIS to the next version number
  name: '999_migration_name', // CHANGE THIS to describe your migration

  /**
   * Migration up - applies the changes
   */
  up: async () => {
    // Add your migration code here
    // Example:
    // await exports.oxmysql.execute_async(`
    //   CREATE TABLE IF NOT EXISTS your_table (
    //     id INT PRIMARY KEY AUTO_INCREMENT,
    //     name VARCHAR(255) NOT NULL
    //   )
    // `);
  },

  /**
   * Migration down - reverts the changes (optional)
   */
  down: async () => {
    // Add your rollback code here
    // Example:
    // await exports.oxmysql.execute_async('DROP TABLE IF EXISTS your_table');
  },
};
