const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");

const setupServer = async () => {
  /* Set up express pipeline */
  let app = express();
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "http://localhost:80",
      on: {
        proxyReq: fixRequestBody,
      },
    })
  );
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

  app.set("views", __dirname);
  app.set("view engine", "html");
  app.engine("html", require("ejs").renderFile);
  app.use(express.static(path.join(__dirname, "../../public")));
  app.get("*", (req, res) => {
    res.render("../../public/index.html");
  });

  /* Start the server */
  const server = app.listen(8080, () => {
    console.log(`ByteBracket dev listening on: ${server.address().port}`);
  });
};

// Run the server
setupServer();
