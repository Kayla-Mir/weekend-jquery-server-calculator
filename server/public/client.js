$(document).ready(onReady);

function onReady() {
    renderNumbers();
    $('#equals-btn').on('click', sendNumbersToServer);
    $('#plus-btn').on('click', setPlus);
    $('#minus-btn').on('click', setMinus);
    $('#multiply-btn').on('click', setMultiply);
    $('#divide-btn').on('click', setDivide);
    $('#clear-btn').on('click', clearInputs);
    $('#clear-history').on('click', clearHistory);
}

// set the operator of object array to 0 so I know no operator has been chosen yet
let newNumbers = {
    operator: 0,
};

// the below 4 functions set the operator
const setPlus = () => {
    newNumbers.operator = '+';
}

const setMinus = () => {
    newNumbers.operator = '-';
}

const setMultiply = () => {
    newNumbers.operator = '*';
}

const setDivide = () => {
    newNumbers.operator = '/';
}

const clearInputs = () => {
    $('#first-number-input').val('');
    $('#second-number-input').val('');
    newNumbers.operator = 0;
}

// sends a GET request to the server to send back the stored numbers, operator, and results
// to be displayed on the DOM
function renderNumbers() {
    $.ajax({
        method: 'GET',
        url: '/numbers'
    }).then((response) => {
        console.log('/numbers response', response);
        $('#history-area').empty();
        for (let line of response) {
            $('#history-area').append(`
                <li>${line.valueOne} ${line.operator} ${line.valueTwo} = ${line.result}</li>
            `);
        }   // if the response length isn't empty then it will appened the latest result to the 
            // DOM, this prevents a slight bug of on page load if the object is empty result
            // doesn't exist
        if (response.length !== 0 ) {
            $('#result-latest').empty();
            $('#result-latest').append(`Answer: ${response[response.length - 1].result}`);
        }
    }).catch((error) => {
        console.log('error', error);
    });
}


// sends a delete request that will empty the stored objects on the server and also clear the
// DOM of its history
function clearHistory() {
    $.ajax({
        method: 'DELETE',
        url: '/clearHistory'
    }).then((response) => {
        console.log('/clearHistory response', response);
        $('#result-latest').empty();
        $('#history-area').empty();
    }).catch((error) => {
        console.log('error', error); 
    })
}

// takes the input numbers and operator and sends them to the server to be stored
function sendNumbersToServer() {  
    newNumbers.valueOne = $('#first-number-input').val();
    newNumbers.valueTwo = $('#second-number-input').val();

    if (newNumbers.operator === 0 
        || newNumbers.valueOne === '' 
        || newNumbers.valueTwo === '') {
        alert('Please make sure all fields are provided!')
    } else {
        $.ajax({
            method: 'POST',
            url: '/sendNumbers',
            data: newNumbers
        }).then((response) => {
            console.log('response', response);
            renderNumbers();
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
