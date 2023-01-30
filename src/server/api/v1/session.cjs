"use strict";

const userDB = require("../../dynamo/user.cjs");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  /**
   * Create user session.
   */
  app.post("/v1/session", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send({ error: "Both fields required." });
    }

    const dynamoUser = await userDB.getUser(username);
    if (!dynamoUser?.username) {
      return res.status(401).send({ error: "Invalid username or password." });
    }

    if (!bcrypt.compareSync(password, dynamoUser.password)) {
      return res.status(401).send({ error: "Invalid username or password." });
    }

    const response = {
      first: dynamoUser.first,
      last: dynamoUser.last,
      username: dynamoUser.username,
      email: dynamoUser.email,
    };
    req.session.user = response;
    res.status(201).send(response);
  });

  /**
   * Check if user session is valid/active.
   */
  app.get("/v1/session", (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(404).send({ error: "No session found." });
    }
  });

  /**
   * End user session.
   */
  app.delete("/v1/session", (req, res) => {
    req.session = null;
    res.status(200).end();
  });
};
