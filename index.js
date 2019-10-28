const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.error("Could not connect to mongodb...", err));

const movieSchema = new mongoose.Schema({
  name: String,
  director: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Movie = mongoose.model("Movie", movieSchema);

async function createMovie() {
  const movie = new Movie({
    name: "Big Hero 6",
    director: "Roger Allers",
    tags: ["animated", "comedy"],
    isPublished: true
  });
  const result = await movie.save();
  console.log(result);
}
async function getCources() {
  const movies = await Movie
    //   .find({ isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } })
    .find()
    .or([{ name: /Hero/ }])
    .limit(10)
    .sort({ name: -1 })
    .select({ name: 1, tags: 1 });
  console.log(movies);
}

getCources();
// createMovie();
