const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require('../Acoout-router/accountRouter')

const server = express();


server.use(express.json());
server.use(logger)

server.use("/api/accounts", accountRouter )

server.get('/', (req, res) => {
    res.send(`Test server with the db`);
  });

function logger(req, res, next) {
    console.log(`${req.method} request the ${req.url}`, Date())
    next();
  }

module.exports = server;
