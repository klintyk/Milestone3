const path = require("path");
const express = require("express");
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set up database connection
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "milestone-3-db.cnv3icnq9rkh.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "burger-joints",
    port: 3306,
  },
});

// Route for root path to serve the HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API endpoint to fetch burger joints based on city
app.get("/joints", (req, res) => {
  const location = req.query.location; // get city from query params
  knex
    .select()
    .from("burger-location")
    .where("location", location) // Filter by the selected city
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database error");
    });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
