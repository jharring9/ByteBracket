/* Copyright G. Hemingway, @2022 - All rights reserved */
"use strict";

module.exports = (app) => {
  app.get("/v1/user/:username", async (req, res) => {
      console.log(req);
      res.status(200).send("Hello World");
  });
};
