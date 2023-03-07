const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const production = env === "production";

const setupServer = async () => {
  /* Set up express pipeline */
  let app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  /* Set up cookie sessions */
  app.store = session({
    name: "session",
    secret: "bytebracketsessionsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  });
  app.use(app.store);
  require("./api/index.cjs")(app);

  /* Only serve web content for development environment */
  if (production) {
    app.get("/health", (req, res) => {
      res.sendStatus(200);
    });
  } else {
    app.set("views", __dirname);
    app.set("view engine", "html");
    app.engine("html", require("ejs").renderFile);
    app.use(express.static(path.join(__dirname, "../../public")));
    app.get("*", (req, res) => {
      res.render("../../public/index.html");
    });
  }

  /* Start the server */
  const server = app.listen(8080, () => {
    console.log(`ByteBracket ${env} listening on: ${server.address().port}`);
  });
};

// Run the server
setupServer();
