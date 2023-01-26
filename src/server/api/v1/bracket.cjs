"use strict";

const bracketDB = require("../../dynamo/bracket.cjs");

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



    //TODO -- use bracketDB.saveBracket(user, id, bracket)
  });

  /**
   * Get a user's specific bracket by id.
   */
  app.get("/v1/:user/bracket/:id", async (req, res) => {
    const { user, id } = req.params;
    //TODO -- use bracketDB.getBracket(user, id)
  });

  /**
   * Get all brackets associated with a user.
   */
  app.get("/v1/:user/brackets", async (req, res) => {
    const { user } = req.params;
    //TODO -- use bracketDB.getUserBrackets(user)
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
