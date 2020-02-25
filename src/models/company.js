const Sequelize = require("sequelize");
const sequelize = require("../config/db");

class Company extends Sequelize.Model {}

Company.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fantasyName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "company"
    // options
  }
);

module.exports = Company;
