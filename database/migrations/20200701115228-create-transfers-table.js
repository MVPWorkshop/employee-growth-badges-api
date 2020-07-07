'use strict';

const tableName = 'transfers';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      tx_hash: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      address_from: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_to: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token_id_on_chain: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  }
};
