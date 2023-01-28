"use strict";

const bracketDB = require("../../dynamo/bracket.cjs");
const {v4: uuidv4} = require("uuid");

module.exports = (app) => {
  /**
   * Create a new bracket.
   */
  app.post("/v1/:user/bracket", async (req, res) => {
    const sessionUser = req.session.user.username;
    const queryUser = req.params.user;
    if (sessionUser !== queryUser) {
      res.status(401).send({ error: "unauthorized" });
    }

    //generate random id
    const id = uuidv4();

    //grab bracket from response
    const bracket = req.body;

    if (!(await bracketDB.saveBracket(sessionUser, id, bracket))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }

    res.status(201).send();

  });

  /**
   * Get a user's specific bracket by id.
   */
  app.get("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;

    const sessionUser = req.session.user.username;
    const queryUser = req.params.user;
    if (sessionUser !== queryUser) {
      res.status(401).send({ error: "unauthorized" });
    }

    //get specific bracket
    const bracket = await bracketDB.getBracket(user, id);

    if (!bracket) {
      return res.status(404).send({ error: "Bracket not found" });
    }

    res.status(200).send(bracket.bracket);
  });

  /**
   * Get all brackets associated with a user.
   */
  app.get("/v1/:user/brackets", async (req, res) => {
    const { user } = req.params;

    const sessionUser = req.session.user.username;
    if (sessionUser !== user) {
      res.status(401).send({ error: "unauthorized" });
    }

    //get all brackets
    const brackets = await bracketDB.getUserBrackets(user);

    if (!brackets) {
      return res.status(404).send({ error: "Brackets not found" });
    }

    res.status(200).send(brackets);
  });

  /**
   * Delete a bracket by id.
   */
  app.delete("/v1/:user/bracket/:id", async (req, res) => {
    const sessionUser = req.session.user.username;
    const queryUser = req.params.user;
    if (sessionUser !== queryUser) {
      res.status(401).send({ error: "unauthorized" });
    }
    //TODO -- delete bracket from dynamoDB by username (primary key) and bracket id (sort key)
  });
};
