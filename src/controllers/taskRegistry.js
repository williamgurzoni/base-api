const Sequelize = require("sequelize");
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require("./commons");
const Op = Sequelize.Op;

const TaskRegistry = require("../models/taskRegistry");

module.exports = {
  async index(req, res) {
    const { limit = 10, page = 1 } = req.query;
    const registries = await TaskRegistry.findAndCountAll({
      limit,
      offset: limit * (page - 1)
    });

    res.json(registries);
  },

  async store(req, res) {
    try {
      const taskRegistry = await TaskRegistry.create(req.body);

      return res.json(taskRegistry);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async show(req, res) {
    const taskRegistry = await TaskRegistry.findOne({
      where: { id: req.params.id }
    });

    if (taskRegistry) {
      res.json(taskRegistry);
    } else {
      res.status(400).json(MESSAGE_ERROR("Not found"));
    }
  },

  async destroy(req, res) {
    try {
      const ret = await TaskRegistry.destroy({ where: { id: req.params.id } });

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
      const ret = await TaskRegistry.update(req.body, {
        where: { id: { [Op.eq]: req.params.id } }
      });

      if (ret[0]) {
        res.status(200).json(MESSAGE_SUCCESS("Successfully updated"));
      } else {
        res.status(400).json(MESSAGE_ERROR("Not found"));
      }
    } catch (error) {
      res.status(400).json(MESSAGE_ERROR(error));
    }
  }
};
