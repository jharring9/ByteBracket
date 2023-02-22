"use strict";

const leagueDB = require("../../dynamo/league.cjs");
const bracketDB = require("../../dynamo/bracket.cjs");
const userDB = require("../../dynamo/user.cjs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  /**
   * Create a new league.
   */
  app.post("/v1/league", async (req, res) => {
    const sessionUser = req.session.user?.username;
    if (!sessionUser) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const id = uuidv4();
    const { name, maxEntries, entriesPerUser, isPrivate, code, lockDate } =
      req.body;

    if (
      !name ||
      !maxEntries ||
      !entriesPerUser ||
      !lockDate ||
      (isPrivate && code.trim().length === 0)
    ) {
      return res.status(400).send({
        error:
          "Missing fields. This is likely a server issue. Please refresh the page and try again.",
      });
    }
    const newLeague = {
      id: id,
      name: name,
      maxEntries: maxEntries,
      entriesPerUser: entriesPerUser,
      isPrivate: isPrivate,
      code: code,
      managerId: sessionUser,
      lockDate: lockDate,
      entries: new Set([""]),
      entryCount: 0,
    };
    if (!(await leagueDB.saveLeague(newLeague))) {
      return res.status(503).send({ error: "Server error. Please try again." });
    }
    await userDB.addLeagueToUser(sessionUser, id);
    res.status(201).send({ id: id });
  });

  /**
   * Get a specific league by id.
   */
  app.get("/v1/league/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.user?.username) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const result = await leagueDB.getLeague(id);
    if (result) {
      const entries = Array.from(result.entries)
        .filter((e) => e !== null && e !== "")
        .map((e) => {
          const [username, bracketId] = e.split("#");
          return { username, bracketId };
        });
      result.entries = await bracketDB.batchGetBrackets(entries);
      return res.status(200).send(result);
    }
    return res.status(404).send({ error: "League not found" });
  });

  /**
   * Delete a league by id.
   */
  app.delete("/v1/league/:id", async (req, res) => {
    const { id } = req.params;
    if (!req.session.user?.username) {
      return res.status(401).send({ error: "unauthorized" });
    }

    const result = await leagueDB.deleteLeague(id);
    if (result) {
      return res.status(204).send();
    }
    return res.status(404).send({ error: "League not found" });
  });

  /**
   * Scan for all public leagues.
   */
  app.get("/v1/leagues/public", async (req, res) => {
    const result = await leagueDB.scanLeagues();
    if (result) {
      result.map((league) => {
        league.entryCount = league.entries.size;
        delete result.entries;
        return league;
      });
      return res.status(200).send(result);
    }
    return res.status(200).send([]);
  });

  /**
   * Get all leagues associated with a user.
   */
  app.get("/v1/leagues/my", async (req, res) => {
    const user = req.session.user?.username;
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    let leagues = (await userDB.getUserLeagues(user))?.leagues;
    if (!leagues) {
      return res.status(200).send([]);
    }
    const result = await leagueDB.batchGetLeagues(leagues);
    if (result) {
      result.map((league) => {
        league.entryCount = league.entries.size;
        delete result.entries;
        return league;
      });
      return res.status(200).send(result);
    }
    return res.status(200).send([]);
  });

  /**
   * Add a bracket to a league.
   */
  app.post("/v1/league/:id", async (req, res) => {
    const user = req.session.user?.username;
    const { id } = req.params;
    const { bracketId } = req.body;
    if (!bracketId) {
      return res.status(400).send({ error: "Invalid request" });
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const result = await leagueDB.addEntryToLeague(id, bracketId, user);
    if (result) {
      return res.status(200).send(result);
    }
    return res.status(401).send({ error: "Error adding entry to league" });
  });

  /**
   * Update league settings.
   */
  app.put("/v1/league/:id", async (req, res) => {
    const user = req.session.user?.username;
    const { id } = req.params;
    const { name, maxEntries, entriesPerUser, isPrivate, code, lockDate } =
      req.body;
    if (
      !name ||
      !maxEntries ||
      !entriesPerUser ||
      !lockDate ||
      (isPrivate && !code)
    ) {
      return res.status(400).send({ error: "Missing fields" });
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" });
    }
    const settings = {
      name: name,
      maxEntries: maxEntries,
      entriesPerUser: entriesPerUser,
      isPrivate: isPrivate,
      code: code,
      lockDate: lockDate,
    };
    const result = await leagueDB.updateLeagueSettings(id, settings);
    if (result) {
      return res.sendStatus(201);
    }
    return res.status(400).send({ error: "Error updating league settings." });
  });
};
