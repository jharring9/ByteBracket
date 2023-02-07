"use strict";

const userDB = require("../../dynamo/user.cjs");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  /**
   * Get user account.
   */
  app.get("/v1/user/:username", async (req, res) => {
    if (!req.session.user)
      return res.status(401).send({ error: "Unauthorized." });

    const dynamoUser = await userDB.getUser(req.params.username);
    if (dynamoUser?.username) {
      const response = {
        first: dynamoUser.first,
        last: dynamoUser.last,
        username: dynamoUser.username,
        email: dynamoUser.email,
      };
      return res.send(response);
    }
    return res.status(404).send({ error: "User not found." });
  });

  /**
   * Create user account.
   */
  app.post("/v1/user", async (req, res) => {
    const { username, first, last, email, password } = req.body;
    if (!username || !password || !first || !last || !email) {
      return res.status(400).send({ error: "All fields required." });
    }

    const dynamoUser = await userDB.getUser(username);
    if (dynamoUser?.username) {
      return res.status(400).send({ error: "Username already in use." });
    }

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      username: username.toLowerCase(),
      first: first.trim(),
      last: last.trim(),
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    if (!(await userDB.saveUser(user))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    const response = {
      first: user.first,
      last: user.last,
      username: user.username,
      email: user.email,
    };
    req.session.user = response;
    res.status(201).send(response);
  });

  /**
   * Update user account.
   */
  app.put("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const { first, last, email } = req.body;
    if (!first || !last || !email) {
      return res.status(400).send({ error: "All fields required." });
    }

    const updatedUser = {
      username: user,
      first: first.trim(),
      last: last.trim(),
      email: email.toLowerCase(),
    };

    if (!(await userDB.updateUser(updatedUser))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    const response = {
      first: updatedUser.first,
      last: updatedUser.last,
      username: user,
      email: updatedUser.email,
    };
    req.session.user = response;
    res.status(201).send(response);
  });

  /**
   * Delete a user account.
   */
  app.delete("/v1/user/:user", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await userDB.deleteUser(user);
    if (result) {
      return res.status(204).send();
    }
    return res.status(404).send({ error: "Bracket not found" });
  });
};
