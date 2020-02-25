const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Company = require("./company");

class Employee extends Sequelize.Model {}

Employee.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salary: {
      type: Sequelize.REAL
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "employee"
    // options
  }
);

// Employee.sync({ force: true });

module.exports = Employee;
