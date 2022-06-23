'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Items.init({
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    item_name: DataTypes.STRING,
    item_status: DataTypes.BOOLEAN,
    status_updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};