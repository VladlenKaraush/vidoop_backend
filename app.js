const express = require("express");
const app = express();
const Joi = require("@hapi/joi");
app.use(express.json());

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
});

const movies = [
  { id: 1, name: "Dead poets society" },
  { id: 2, name: "Project Florida" },
  { id: 3, name: "Equilibrium" }
];
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(el => el.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with the given ID was not found");
  res.send(movie);
});

app.post("/api/movies", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = {
    id: movies.length + 1,
    name: req.body.name
  };
  movies.push(movie);
  res.send(movie);
});

app.put("/api/movies/:id", (req, res) => {
  //   movie lookup in state
  const movie = movies.find(el => el.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with the given ID was not found");

  //   movie validation
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //   movie update
  movie.name = req.body.name;
  res.send(movie);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
