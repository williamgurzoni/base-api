const Sequelize = require("sequelize");
const sequelize = require("../config/db");

class Customer extends Sequelize.Model {}

Customer.init(
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
    modelName: "customer"
    // options
  }
);

// Customer.sync();

module.exports = Customer;
