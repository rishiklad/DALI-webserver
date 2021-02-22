// Initializing variables 
const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const data = require('./seed'); 
const methodOverride = require('method-override');

// Start app
const app = express(); 

// Configurations for rendering views 
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ensures incoming requests with bodies are readable
app.use(express.urlencoded({ extended: true }));

// To extend form functionality beyond GET/POST
app.use(methodOverride('_method'));

////////////////////////////////////////
//             ROUTES                 //
////////////////////////////////////////

// GET Routes
app.get('/', (req, res) => {
    res.send('Hello and welcome! Usage of this webserver is documented in the README. Happy analyzing!'); 
})

// Returns all members 
app.get('/members', (req, res) => {
    res.send(data); 
})

// Returns all members that have a {key} value greater than the {min}
app.get('/:key/gt/:min', (req, res) => {
    const characteristic = req.params.key;
    const min = parseInt(req.params.min); 
    let matches = data.filter(function (person) {
        return parseInt(person[`${characteristic}`]) > parseInt(min);
    }); 
    res.send(matches); 
})

// Returns all members that have a {key} value greater than or equal to the {min}
app.get('/:key/gte/:min', (req, res) => {
    const characteristic = req.params.key;
    const min = parseInt(req.params.min);
    let matches = data.filter(function (person) {
        return parseInt(person[`${characteristic}`]) >= parseInt(min);
    });
    res.send(matches);
})

// Returns all members that have a {key} value less than the {max}
app.get('/:key/lt/:max', (req, res) => {
    const characteristic = req.params.key;
    const max = parseInt(req.params.max);
    let matches = data.filter(function (person) {
        return parseInt(person[`${characteristic}`]) < parseInt(max);
    });
    res.send(matches);
})

// Returns all members that have a {key} value less than or equal to the {max}
app.get('/:key/lte/:max', (req, res) => {
    const characteristic = req.params.key;
    const max = parseInt(req.params.max);
    let matches = data.filter(function (person) {
        return parseInt(person[`${characteristic}`]) <= parseInt(max);
    });
    res.send(matches);
})

// Returns all members that have a {key} string value equal to the string {arg} 
app.get('/:key/strEquals/:arg', (req, res) => {
    const characteristic = req.params.key;
    const arg = req.params.arg;
    let matches = data.filter(function (person) {
        return person[`${characteristic}`].toLowerCase() === arg.toLowerCase();
    });
    res.send(matches);
})

// Returns all members that have a {key} numerical value equal to the numerical {arg}
app.get('/:key/numEquals/:arg', (req, res) => {
    const characteristic = req.params.key;
    const arg = parseInt(req.params.arg);
    let matches = data.filter(function (person) {
        return parseInt(person[`${characteristic}`]) == parseInt(arg);
    });
    res.send(matches);
})

// Returns all members that have a {key} value between the {min} and {max}
app.get('/:key/between/:min/:max', (req, res) => {
    const characteristic = req.params.key;
    const min = parseInt(req.params.min); 
    const max = parseInt(req.params.max);
    let matches = data.filter(function (person) {
        return (parseInt(person[`${characteristic}`]) > parseInt(min) && parseInt(person[`${characteristic}`]) < parseInt(max));
    });
    res.send(matches);
})

// Returns the average value for the given {key}
app.get('/:key/average', (req, res) => {
    const characteristic = req.params.key;
    let sum = 0; 
    for (let person of data) {
        sum += person[`${characteristic}`]; 
    }
    const average = sum / data.length;
    res.send(`The average for ${characteristic} is ${average}`); 
})

// Returns the total sum for the given {key} across all DALI members 
app.get('/:key/sum', (req, res) => {
    const characteristic = req.params.key;
    let sum = 0;
    for (let person of data) {
        sum += person[`${characteristic}`];
    }
    res.send(`The total sum for ${characteristic} is ${sum}`);
})

// Returns the number of occurences for the given {key} and numerical {arg} pair across all DALI members  
app.get('/:key/numOccur/:arg', (req, res) => {
    const characteristic = req.params.key;
    const arg = parseInt(req.params.arg);
    let occurences = 0; 

    for (let person of data) {
        if (parseInt(person[`${characteristic}`]) == arg) {
            occurences++; 
        }
    }
    res.send(`The number of lab members that have a(n) ${characteristic} value of ${arg} is ${occurences}`);
})

// Returns the number of occurences for the given {key} and string {arg} pair across all DALI members
app.get('/:key/strOccur/:arg', (req, res) => {
    const characteristic = req.params.key;
    const arg = req.params.arg;
    let occurences = 0;

    for (let person of data) {
        if (person[`${characteristic}`].toLowerCase() === arg.toLowerCase()) {
            occurences++;
        }
    }
    res.send(`The number of lab members that have a(n) ${characteristic} value of ${arg} is ${occurences}`);
})

// Returns the most frequent value (mode) for the given {key}   
app.get('/:key/mostFrequent', (req, res) => {
    const characteristic = req.params.key;
    let modeMap = {};
    let mode = -1, maxCount = -1;
    
    for (let person of data) {
        let value = person[`${characteristic}`]; 
        if (modeMap[value] == null) {
            modeMap[value] = 1; 
        }
        else {
            modeMap[value]++; 
        }

        if (modeMap[value] > maxCount) {
            mode = value; 
            maxCount = modeMap[value]; 
        }
    }

    res.send(`The most frequent value for ${characteristic} is ${mode}`);
})

// POST Routes
// Directly inputs incoming request's body into the dataset 
app.post('/members', (req, res) => {
    const newMember = req.body; 
    data.push(newMember); 
    console.log(newMember); 
    res.send(`Successfully added new member to the dataset of DALI members!\nCheck console log for information about the newly added member`); 
})

// Directly adds the {key}:{arg} pair to every DALI member 
app.post('/members/:key/:arg', (req, res) => {
    const characteristic = req.params.key;
    const arg = req.params.arg; 
    for (let person of data) {
        person[`${characteristic}`] = arg; 
    }
    console.log(data); 
    res.send(`Successfully added the ${characteristic}:${arg} key:value pair to each DALI member!\nSee console log for the entire dataset to verify changes`); 
})

// 404 Route
app.all("*", (req, res) => {
    res.status(404).send("Invalid endpoint. Remember that keys are case-sensitive! Refer to the README for endpoint usage."); 
})

app.listen(3000, () => {
    console.log('SERVING ON PORT 3000');
})
