const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
});

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find(el => el.id === parseInt(req.params.id));
  if (!genre) res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

router.post("", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  //   movie lookup in state
  const genre = genres.find(el => el.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  //   movie validation
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //   movie update
  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  //   movie lookup in state
  const genre = genres.find(el => el.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  const ind = genres.indexOf(genre);
  genres.splice(ind, 1);
  res.send(genre);
});

module.exports = router;
