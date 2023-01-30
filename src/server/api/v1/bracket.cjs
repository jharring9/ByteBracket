"use strict";

const bracketDB = require("../../dynamo/bracket.cjs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  /**
   * Create a new bracket.
   */
  app.post("/v1/:user/bracket", async (req, res) => {
    const sessionUser = req.session.user?.username;
    const queryUser = req.params.user;
    if (sessionUser !== queryUser) {
      res.status(401).send({ error: "unauthorized" });
    }

    const id = uuidv4();
    const { bracket, complete, name, winner } = req.body;

    if (
      !(await bracketDB.saveBracket(
        sessionUser,
        id,
        bracket,
        complete,
        name,
        winner
      ))
    ) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    res.status(201).send({ id: id });
  });

  /**
   * Get a user's specific bracket by id.
   */
  app.get("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      res.status(401).send({ error: "unauthorized" });
    }

    const result = await bracketDB.getBracket(user, id);
    if (result) {
      return res.status(200).send(result.bracket);
    }
    return res.status(404).send({ error: "Bracket not found" });
  });

  /**
   * Get all brackets associated with a user.
   */
  app.get("/v1/:user/brackets", async (req, res) => {
    const { user } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await bracketDB.getUserBrackets(user);
    if (result) {
      return res.status(200).send(result);
    }
    return res.status(404).send({ error: "User not found" });
  });

  /**
   * Delete a bracket by id.
   */
  app.delete("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;
    const sessionUser = req.session.user?.username;
    if (sessionUser !== user) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await bracketDB.deleteBracket(user, id);
    if (result) {
      return res.status(204).send();
    }
    return res.status(404).send({ error: "Bracket not found" });
  });
};
