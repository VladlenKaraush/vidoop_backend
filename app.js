const express = require("express");
const debug = require("debug")("app:startup");
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const movies = require("./routes/movies");
const home = require("./routes/home");
const genres = require("./routes/genres");

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.error("Could not connect to mongodb...", err));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/", home);

console.log(" name: " + config.get("name"));
console.log(" mail server: " + config.get("mail.host"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

const port = process.env.PORT || 3900;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
