const { Users } = require("../models");
const Joi = require("joi");
const e = require("express");

module.exports = {
  userCreate: async (req, res) => {
    const { body, file } = req;
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        img: Joi.string(),
      });

      const { error } = schema.validate({
        ...body,
        img: file.path,
      });

      if (error) {
        return res.status(400).json({
          status: "Bad Request",
          message: error.message,
          result: {},
        });
      }

      const user = await Users.create({
        ...body,
        img: file.path,
      });

      return res.status(201).json({
        status: "ok",
        message: "user successfuly created",
        result: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        result: {},
      });
    }
  },
  userGetAll: async (req, res) => {
    try {
      const users = await Users.findAll({
        limit: 10,
      });
      return res.status(200).json({
        status: "ok",
        message: "Successfuly retrieve users",
        result: users,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        messagea: "Internal server error",
        result: {},
      });
    }
  },
};
