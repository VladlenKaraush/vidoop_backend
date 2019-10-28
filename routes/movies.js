const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();

const movies = [
  { id: 1, name: "Dead poets society" },
  { id: 2, name: "Project Florida" },
  { id: 3, name: "Equilibrium" }
];

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
});

router.get("/", (req, res) => {
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const movie = movies.find(el => el.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with the given ID was not found");
  res.send(movie);
});

router.post("", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = {
    id: movies.length + 1,
    name: req.body.name
  };
  movies.push(movie);
  res.send(movie);
});

router.put("/:id", (req, res) => {
  //   movie lookup in state
  const movie = movies.find(el => el.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");

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

router.delete("/:id", (req, res) => {
  //   movie lookup in state
  const movie = movies.find(el => el.id === parseInt(req.params.id));
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");

  const ind = movies.indexOf(movie);
  movies.splice(ind, 1);
  res.send(moviemovie);
});

module.exports = router;
