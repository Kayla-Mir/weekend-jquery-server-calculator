const express = require('express');

const app = express();
const PORT = 5000;

let numbersToCalculate = [];

app.use(express.static('./server/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/numbers', (req, res) => {
    console.log('in GET /numbers');
    res.send(numbersToCalculate);
});

app.get('/clearHistory', (req, res) => {
    console.log('in GET /clearHistory');
    clearHistory();
    res.send(200);
})

app.post('/sendNumbers', (req, res) => {
    console.log('in POST /sendNumbers, here is req.body', req.body);
    calculateAnswer(req.body);
    res.sendStatus(201);
});

const calculateAnswer = (data) => {
    if (data.operator === '+') {
        data.result = Number(data.valueOne) + Number(data.valueTwo);
    } else if (data.operator === '-') {
        data.result = Number(data.valueOne) - Number(data.valueTwo);
    } else if (data.operator === '*') {
        data.result = Number(data.valueOne) * Number(data.valueTwo);
    } else if (data.operator === '/') {
        data.result = Number(data.valueOne) / Number(data.valueTwo);
    }
    numbersToCalculate.push(data);
}

const clearHistory = () => {
    numbersToCalculate = [];
}

app.listen(PORT, function() {
    console.log('Your server is good to go!');
})