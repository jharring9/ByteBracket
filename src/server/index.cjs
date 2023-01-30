/* Copyright G. Hemingway, 2022 - All rights reserved */
"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const fs = require("fs");
const https = require("https");
const http = require("http");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

const setupServer = async () => {
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
    saveUninitialized: true,
    cookie: { secure: true },
  });
  app.use(app.store);

  // Finish with the body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Import our routes
  require("./api/index.cjs")(app);

  // Give them the SPA base page
  app.get("*", (req, res) => {
    res.render("../../public/index.html");
  });

  let server;
  if (env === "production") {
    const options = {
      key: fs.readFileSync(
        "/etc/letsencrypt/live/bytebracket.io/privkey.pem",
        "utf8"
      ),
      cert: fs.readFileSync(
        "/etc/letsencrypt/live/bytebracket.io/cert.pem",
        "utf8"
      ),
      ca: fs.readFileSync(
        "/etc/letsencrypt/live/bytebracket.io/chain.pem",
        "utf8"
      ),
    };
    // Listen for HTTPS requests
    server = https.createServer(options, app).listen(443, () => {
      console.log(`ByteBracket ${env} listening on: ${server.address().port}`);
    });
    // Redirect HTTP to HTTPS
    http
      .createServer((req, res) => {
        const location = `https://${req.headers.host}${req.url}`;
        res.writeHead(302, { Location: location });
        res.end();
      })
      .listen(80, () => {
        console.log(`ByteBracket ${env} listening on 80 for HTTPS redirect`);
      });
  } else {
    server = app.listen(8080, () => {
      console.log(`ByteBracket ${env} listening on: ${server.address().port}`);
    });
  }
};

// Run the server
setupServer();
