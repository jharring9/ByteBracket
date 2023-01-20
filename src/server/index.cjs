/* Copyright G. Hemingway, 2022 - All rights reserved */
"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

const setupServer = async () => {
  const port = 8080;

  // Setup our Express pipeline
  let app = express();
  app.set("views", __dirname);
  app.set("view engine", "html");
  app.engine("html", require("ejs").renderFile);
  app.use(express.static(path.join(__dirname, "../../public")));
  // Setup pipeline session support
  app.store = session({
    name: "session",
    secret: "bytebracketsessionsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
    },
  });
  app.use(app.store);
  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Import our routes
  require("./api/index.cjs")(app);

  // Give them the SPA base page
  app.get("*", (req, res) => {
    const user = req.session.user;
    let preloadedState = user
      ? {
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          primary_email: user.primary_email,
          city: user.city,
          games: user.games,
        }
      : {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    res.render("../../public/index.html", {
      state: preloadedState,
    });
  });

  let server = app.listen(port, () => {
    console.log(`ByteBracket ${env} listening on: ${server.address().port}`);
  });
};

// Run the server
setupServer();
