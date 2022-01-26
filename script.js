var express = require('express');
const cors = require('cors');
var fs = require('fs');
const { response } = require('express');
var app = express();
var port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send('Diktator API');
});

app.get('/kage', function (req, res) {
    responses = {
        first_name: req.query.name,
        last_name: req.query.date
    };
    console.log(responses);
    let array = ["kage","mand","ja tak"];
    res.end(JSON.stringify(array));
});

app.post('/create_diktator', function (req, res) {
    cd_reponses = {
        name: req.query.name,
        birthdate: req.query.birthdate,
        deathdate: req.query.deathdate,
    };

    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata)["Diktator"];
    console.log(Object.keys(data).length);

    if (cd_reponses.name && cd_reponses.birthdate && cd_reponses.deathdate) {
        res.send('true');
    }
    else{
        console.log("%s", cd_reponses.name);
        res.end('The Required data is not set');
    }
 });

app.get('/list_diktator', function (req, res) {
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);
    console.log("Got a GET request for /list_diktator");
    res.send(JSON.stringify(data["Diktator"]));
 });

var server = app.listen(port, function () {
    console.log("Up and running");
});