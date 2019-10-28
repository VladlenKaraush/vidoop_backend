const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.error("Could not connect to mongodb...", err));

const movieSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", movieSchema);

async function createMovie() {
  const movie = new Course({
    name: "Big Hero 6",
    author: "Roger Allers",
    tags: ["animated", "comedy"],
    isPublished: true
  });
  const result = await movie.save();
  console.log(result);
}
async function getCources() {
  const movies = await Course
    //   .find({ isPublished: true })
    // .find({ price: { $gt: 10, $lte: 20 } })
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /by/i }])
    // .or([{ name: /Hero/ }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
  // .count();
  console.log(movies);
}

getCources();
// createMovie();
