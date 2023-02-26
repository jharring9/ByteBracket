/* Copyright G. Hemingway, 2022 - All rights reserved */
"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

const setupServer = async () => {
  // Setup our Express pipeline
  let app = express();
  app.set("views", __dirname);
  app.set("view engine", "html");
  app.engine("html", require("ejs").renderFile);

  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "bytebracketsessionsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  });
  app.use(app.store);

  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Import our routes
  require("./api/index.cjs")(app);

  if (env === "production") {
    app.get("/health", (req, res) => {
      res.sendStatus(200);
    });
  } else {
    app.use(express.static(path.join(__dirname, "../../public")));
    app.get("*", (req, res) => {
      res.render("../../public/index.html");
    });
  }
  const server = app.listen(8080, () => {
    console.log(`ByteBracket ${env} listening on: ${server.address().port}`);
  });
};

// Run the server
setupServer();
