const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Employee = require("./employee");
const Project = require("./project");
const Customer = require("./customer");

class TaskRegistry extends Sequelize.Model {}

TaskRegistry.init(
  {
    employeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: "id"
      }
    },
    projectId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Project,
        key: "id"
      }
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Customer,
        key: "id"
      }
    },
    timeStart: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    timeEnd: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    time: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "taskRegistry"
    // options
  }
);

// TaskRegistry.sync({ force: true });

module.exports = TaskRegistry;
