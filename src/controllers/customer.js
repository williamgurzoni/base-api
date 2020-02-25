const Sequelize = require("sequelize");
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require("./commons");
const Op = Sequelize.Op;

const Customer = require("../models/customer");

module.exports = {
  async index(req, res) {
    const { limit = 10, page = 1 } = req.query;
    const customers = await Customer.findAndCountAll({
      limit,
      offset: limit * (page - 1)
    });

    res.json(customers);
  },

  async store(req, res) {
    try {
      const customer = await Customer.create(req.body);

      return res.json(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  async show(req, res) {
    const customer = await Customer.findOne({ where: { id: req.params.id } });

    if (customer) {
      res.json(customer);
    } else {
      res.status(400).json(MESSAGE_ERROR("Not found"));
    }
  },

  async destroy(req, res) {
    try {
      const ret = await Customer.destroy({ where: { id: req.params.id } });

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
      const ret = await Customer.update(req.body, {
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
