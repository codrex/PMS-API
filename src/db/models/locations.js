const { setTotalResidents } = require('../../lib/utils');

module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maleResidents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      femaleResidents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalResidents: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      parentLocationId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      childLocationId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );
  Locations.beforeCreate(setTotalResidents);
  Locations.beforeUpdate(setTotalResidents);

  Locations.associate = function association(models) {
    // associations can be defined here
    Locations.hasMany(models.Locations, {
      as: 'childrenLocations',
      foreignKey: 'childLocationId',
    });
    Locations.belongsTo(models.Locations, { as: 'parentLocation' });
  };
  return Locations;
};
