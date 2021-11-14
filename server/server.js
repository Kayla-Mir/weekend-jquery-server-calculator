const express = require('express');

const app = express();
const PORT = 5000;

let numbersToCalculate = [];

app.use(express.static('./server/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// sends back the numbersToCalculate array of objects
app.get('/numbers', (req, res) => {
    console.log('in GET /numbers');
    res.send(numbersToCalculate);
});

// runs the function to delete the array of objects
app.delete('/clearHistory', (req, res) => {
    console.log('in DELETE /clearHistory');
    clearHistory();
    res.sendStatus(200);
})

// sends back the results to the inputs and operator chosen
app.post('/sendNumbers', (req, res) => {
    console.log('in POST /sendNumbers, here is req.body', req.body);
    calculateAnswer(req.body);
    res.sendStatus(201);
});

// calculates the results
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

// sets array to empty for clearing the history
const clearHistory = () => {
    numbersToCalculate = [];
}

app.listen(PORT, function() {
    console.log('Your server is good to go!');
})