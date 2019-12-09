module.exports = () => {
  // Load The FS Module & The Config File
  const fs = require("fs");

  // Load The Path Module
  const path = require("path");

  // Load the Web Torrent Module
  const WebTorrent = require('webtorrent');

  // Load the configuration JSON file
  const config = JSON.parse(fs.readFileSync("config.json"));

  // Load Express Module
  const express = require("express");
  const app = express();

  // Load Body Parser Module
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  // Load Express Handlebars Module & Setup Express View Engine
  const expressHandlebars = require("express-handlebars");
  app.set("views", __dirname + "/views/"); // Set The Views Directory
  app.engine(
    "html",
    expressHandlebars({
      // Setup View Engine Middleware
      layoutsDir: __dirname + "/views/layouts",
      defaultLayout: "main",
      extname: ".html",
      helpers: {
        section: function (name, options) {
          if (!this._sections) {
            this._sections = {};
          }
          this._sections[name] = options.fn(this);
          return null;
        }
      }
    })
  );
  app.set("view engine", "html");

  // Load Express Session Module
  const session = require("express-session");
  app.use(
    session({
      // Setup Session Middleware
      secret: config.session.secret,
      saveUninitialized: true,
      resave: true
    })
  );


  app.use(express.static(path.join(__dirname, "/../public/")));

  // Load Available Modules For Dependancy Injection Into Models & Routes
  const modules = {
    app: app,
    bodyParser: bodyParser,
    config: config,
    express: express,
    expressHandlebars: expressHandlebars,
    fs: fs,
    path: path,
    session: session,
    WebTorrent: WebTorrent
  };

  // Setup Globally Included Routes
  fs.readdirSync(path.join(__dirname, "routes")).forEach(function (filename) {
    if (~filename.indexOf(".js"))
      require(path.join(__dirname, "routes/" + filename))(modules);
  });

  // Start The HTTP Server
  app.listen(config.server.port, config.server.host);
};
