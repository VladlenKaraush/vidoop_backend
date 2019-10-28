const express = require("express");
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const app = express();
const logger = require("./middleware/logger");
const movies = require("./routes/movies");
const home = require("./routes/home");
const genres = require("./routes/genres");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/", home);

console.log(" name: " + config.get("name"));
console.log(" mail server: " + config.get("mail.host"));
console.log(" mail password: " + config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
