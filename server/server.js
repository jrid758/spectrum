require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let cors = require('cors')
const port = process.env.PORT || 80;
let app = express()

console.log("Server Start");

// Catch Errors
app.use(function(err, req, res, next){
    console.log('Error at Top:');
    console.log(err.message);
    res.status(500).send(err);
});

app.listen(port)
console.log("Running Port: " + port)