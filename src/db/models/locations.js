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

      childLocation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );
  Locations.associate = function association(models) {
    // associations can be defined here
    Locations.hasMany(models.Locations, { as: 'childLocations' });
    Locations.belongsTo(models.Locations);
  };
  return Locations;
};
