"use strict";

const http = require("http");
const path = require("path");
const cors = require("cors");

const express = require("express");

const app = express();

const { port, host } = require("./config/config.json");

const Datastorage = require(path.join(
  __dirname,
  "storage",
  "dataAccessLayer.js"
));

const storage = new Datastorage();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/api/turtles", (req, res) =>
  storage
    .getAll()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.get("/api/turtles/:number", (req, res) =>
  storage
    .getOne(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.post("/api/turtles", (req, res) => {
  const turtle = req.body;
  storage
    .insert(turtle)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.put("/api/turtles/:number", (req, res) => {
  const turtle = req.body;
  const number = req.params.number;
  storage
    .update(number, turtle)
    .then((status) => res.json(status))
    .catch((err) => res.json(err));
});

app.delete("/api/turtles/:number", (req, res) =>
  storage
    .remove(req.params.number)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
);

app.all("*", (req, res) => res.json("Wrong entry. Try /api/turtles. "));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} available.`)
);
