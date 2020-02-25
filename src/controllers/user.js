const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require("./commons");
const Op = Sequelize.Op;

const User = require("../models/user");

module.exports = {
  async index(req, res) {
    const { limit = 10, page = 1, filter = null } = req.query;
    const { sort = "id", order = "ASC" } = req.query;

    let where = {};

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        where = { ...where, [key]: { [Op.iLike]: `%${value}%` } };
      });
    }

    const users = await User.findAndCountAll({
      limit,
      offset: limit * (page - 1),
      order: Sequelize.literal(`${sort} ${order}`),
      where
    });
    res.json(users);
  },

  async store(req, res) {
    try {
      const user = await User.create(req.body);

      const retUser = user.dataValues;

      // Delete password from return
      delete retUser.password;

      res.status(201).json(retUser);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async show(req, res) {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (user) {
      res.json(user);
    } else {
      res.status(400).json(MESSAGE_ERROR("Not found"));
    }
  },

  async destroy(req, res) {
    try {
      const ret = await User.destroy({ where: { id: req.params.id } });

      if (ret) {
        res.status(200).json(MESSAGE_SUCCESS("Successfully deleted"));
      } else {
        res.status(400).json(MESSAGE_ERROR("Not found"));
      }
    } catch (error) {
      res.status(400).json(MESSAGE_ERROR(error));
    }
  },

  async update(req, res) {
    try {
      const ret = await User.update(req.body, {
        where: { id: { [Op.eq]: req.params.id } }
      });

      if (ret[0]) {
        res.status(200).json(MESSAGE_SUCCESS("Successfully updated"));
      } else {
        res.status(400).json(MESSAGE_ERROR("Not found"));
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(MESSAGE_ERROR(error));
    }
  },

  async login(req, res) {
    try {
      const { user, password } = req.body;
      const realUser = await User.scope("withPassword").findOne({
        where: { user: { [Op.eq]: user } }
      });

      if (!realUser) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isPasswordMatch = await bcrypt.compare(password, realUser.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // send token
      const token = jwt.sign({ userId: realUser.id }, process.env.JWT_KEY, {
        expiresIn: 129600
      });

      const userData = { ...realUser.dataValues };

      delete userData.password;

      res.json({ token, ...userData });
    } catch (error) {
      res.status(401).send(error);
    }
  }
};
