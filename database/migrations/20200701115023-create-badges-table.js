'use strict';

const tableName = 'badges';

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
      organization_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'organizations',
          },
          key: 'id'
        }
      },
      creator_address_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'addresses',
          },
          key: 'id'
        }
      },
      created_for_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      special_note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      badge_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token_id_on_chain: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
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
