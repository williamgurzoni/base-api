const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");

class User extends Sequelize.Model {}

User.init(
  {
    // Attributes
    user: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    // options
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["password"] }
    },
    scopes: {
      withPassword: {
        attributes: {}
      }
    }
  }
);

// Hook to hash password
User.beforeCreate(async (user, options) => {
  return (user.password = await bcrypt.hash(user.password, 10));
});

// User.sync({ force: true });

module.exports = User;
