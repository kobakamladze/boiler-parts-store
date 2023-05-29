'use strict';
const { Model } = require('sequelize');
const { DataType } = require('sequelize-typescript');
module.exports = (sequelize, DataTypes) => {
  class BoilerParts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoilerParts.init(
    {
      boiler_manufacturer: DataType.STRING,
      parts_manufacturer: DataType.STRING,
      price: DataType.NUMBER,
      name: DataType.STRING,
      vendor_code: DataType.STRING,
      description: DataType.STRING,
      images: DataType.STRING,
      in_stock: DataType.NUMBER,
      bestseller: DataType.BOOLEAN,
      new: DataType.BOOLEAN,
      popularity: DataType.NUMBER,
      compatibility: DataType.STRING,
    },
    {
      sequelize,
      modelName: 'BoilerParts',
    },
  );
  return BoilerParts;
};
