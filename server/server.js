require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 80
const app = express()
const moment = require('moment')

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.DB_PASS,
    database: 'lpt'
});

app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

// api to retrieve traces from database
app.get('/api/traces/:id', function(req,res,next) {
    let sql = `SELECT trace_data,trace_time FROM test WHERE trace_id = ${req.params.id}`
    db.query(sql , function (err, result, fields) {
    if (err) {
        console.log(err);
        next(err); //throw error
    } else {
        let buf = result[0].trace_data
        let arrayValues = []
        let frequency = 850
        let time = timeUpdate(result[0].trace_time)
        //Breaking blob into 4 byte groups and pushing into arrayValues
        for(let i = 0;i < buf.length;i = i + 4) {
            let number2 = buf.readUIntBE(i,4)
            let converted = number2>>0
            arrayValues.push({amplitude: converted/1000, freq: frequency, trace_time: time})
            frequency = frequency + 0.5 
        };
        // send data to client
        res.json(arrayValues)
    }
  });
});

// Catch Errors
app.use(function(err, req, res, next){
    console.log('Error at Top:');
    console.log(err.message);
    res.status(500).send(err);
});

app.listen(port)
console.log("Running Port: " + port)

function timeUpdate(time) {
    let timeUpdate = 'Trace Time: ' + moment(time, "MM-DD-YYYY HH:mm:ss").format('MM-DD-YYYY h:mm:ss A')
    return timeUpdate
}