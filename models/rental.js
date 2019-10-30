const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { movieSchema } = require("./movie");
const { customerSchema } = require("./customer");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    trim: true
  },
  numberInStock: { type: Number, min: 0, max: 255, required: true },
  dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
  genre: { type: schema, required: true }
});
const Rental = mongoose.model("Rental", rentalSchema);

const joiSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(30)
    .required(),
  numberInStock: Joi.number().min(0),
  dailyRentalRate: Joi.number().min(0),
  genreId: Joi.string().required()
});

function validate(movie) {
  return joiSchema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validate;
exports.movieSchema = movieSchema;
