const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Company = require("./company");
const Customer = require("./customer");

class Project extends Sequelize.Model {}

Project.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING
    },
    companyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Company,
        key: "id"
      }
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "project"
    // options
  }
);

// Project.sync({ force: true });

module.exports = Project;
