"use strict";

module.exports = (app) => {
  app.get("/v1/user", async (req, res) => {
    const user = {
      name: "Test User",
      handle: "testuser",
      email: "tom@example.com",
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
};
