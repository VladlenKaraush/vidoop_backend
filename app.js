const express = require("express");
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`listening on port ${port}...`);
});
