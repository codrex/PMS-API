module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    maleResidents: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    femaleResidents: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalResidents: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    childLocation: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'Locations',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Locations'),
};
