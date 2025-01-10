"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Categoria, {
        foreignKey: "idCategoria",
        as: "categoria",
      });
    }
  }
  Producto.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      descripcion: { type: DataTypes.STRING, allowNull: false },
      precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      idCategoria: { type: DataTypes.INTEGER, allowNull: false },
      activo: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return Producto;
};
