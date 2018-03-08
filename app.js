const express = require('express')
const app = express()
const fs = require('fs');
var format = require('date-fns/format')
var https = require('https');
var agent = require('superagent');

app.get('/', (req, res) => {
    res.send('Hello World')
})

var jsonToFile = (data) => {
    var fileName = format(Date(), 'DD-MM-YYYY_HH-mm');
    var path = 'data/';
    fs.writeFile(path + fileName + '.json', JSON.stringify(data, null, 4), (err) => {
        if (err) throw err;
        console.log('The file has been saved!')
    })
}

agent
    .get('https://www.reddit.com/r/ethereum/new.json')
    .query({ query: 'Manny', range: '1..5', order: 'desc' })
    .then((res) => {
        jsonToFile(res.body.data);
    });

app.listen(3000, () => console.log('Example app listening on port 3000!'))