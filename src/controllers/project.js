const Sequelize = require("sequelize");
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require("./commons");
const Op = Sequelize.Op;

const Project = require("../models/project");

module.exports = {
  async index(req, res) {
    const { limit = 10, page = 1 } = req.query;
    const projects = await Project.findAndCountAll({
      limit,
      offset: limit * (page - 1)
    });

    res.json(projects);
  },

  async store(req, res) {
    try {
      const project = await Project.create(req.body);

      return res.json(project);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async show(req, res) {
    const project = await Project.findOne({ where: { id: req.params.id } });

    if (project) {
      res.json(project);
    } else {
      res.status(400).json(MESSAGE_ERROR("Not found"));
    }
  },

  async destroy(req, res) {
    try {
      const ret = await Project.destroy({ where: { id: req.params.id } });

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
      const ret = await Project.update(req.body, {
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
