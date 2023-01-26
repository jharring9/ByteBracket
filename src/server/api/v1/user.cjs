"use strict";

const Joi = require("joi");

module.exports = (app) => {
  app.get("/v1/user", async (req, res) => {
    const user = {
      first: "Test",
      last: "User",
      username: "testuser",
      email: "test@user.com",
    };
    res.send(user);
  });

  app.get("/v1/user/brackets", async (req, res) => {
    const brackets = [
      {
        id: 1,
        name: "Test Bracket 1",
        winner: "Team 1",
        complete: true,
      },
      {
        id: 2,
        name: "Test Bracket 2",
        winner: "Team 2",
        complete: true,
      },
      {
        id: 3,
        name: "Test Bracket 3",
        winner: "Team 3",
        complete: true,
      },
      {
        id: 4,
        name: "Test Bracket 4",
        winner: "None",
        complete: false,
      },
    ];

    res.send(brackets);
  });

  const schema = Joi.object({
    username: Joi.string().lowercase().alphanum().max(32).required(),
    email: Joi.string().lowercase().email().required(),
    first: Joi.string().required(),
    last: Joi.string().required(),
    password: Joi.string().required(),
  });

  app.post("/v1/user", async (req, res) => {
    let data;
    try {
      data = await schema.validateAsync(req.body, { stripUnknown: true });
    } catch (err) {
      const message = err.details[0].message;
      return res.status(400).send({ error: message });
    }

    //TODO -- create account with Cognito, post data to DynamoDB
    req.session.user = {
      first: data.first,
      last: data.last,
      username: data.username,
      email: data.email,
    };
    res.status(201).send({
      first: data.first,
      last: data.last,
      username: data.username,
      email: data.email,
    });
  });
};
