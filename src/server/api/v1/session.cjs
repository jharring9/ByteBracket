/* Copyright G. Hemingway, @2022 - All rights reserved */
"use strict";

const Joi = require("joi");

module.exports = (app) => {
  app.post("/v1/session", async (req, res) => {
    const schema = Joi.object({
      username: Joi.string().lowercase().required(),
      password: Joi.string().required(),
    });
    try {
      const data = await schema.validateAsync(req.body, { stripUnknown: true });

      //TODO -- sign in with Cognito, query DynamoDB for user data
      const user = {
        first: "Test",
        last: "User",
        username: "testuser",
        email: "tom@example.com",
      };

      req.session.user = user;
      res.status(200).send({
        first: "Test",
        last: "User",
        username: "testuser",
        email: "tom@example.com",
      });
    } catch (err) {
      const message = err.details[0].message;
      res.status(400).send({ error: message });
    }
  });

  app.get("/v1/session", (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(204).end();
    }
  });

  app.delete("/v1/session", (req, res) => {
    req.session = null;
    res.status(200).end();
  });
};
