const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.error("Could not connect to mongodb...", err));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 }
});

const Genre = mongoose.model("Genre", genreSchema);

// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Romance" }
// ];

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
});

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) res.status(404).send("The genre with the given ID was not found");
  res.send(genre);
});

router.post("", async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name
  });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (ex) {
    console.log(ex.message);
    res.send(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const genre = Genre.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name
      }
    }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  //   movie validation
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  //   movie lookup in state
  const result = await Genre.deleteOne({ _id: req.params.id });
  if (result.n > 0) {
    res.send("OK");
  } else {
    res.status(404).send("The genre with the given ID was not found");
  }
});

module.exports = router;
