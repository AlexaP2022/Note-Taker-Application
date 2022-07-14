const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const app = express();
const api = require('./routes/routes.js');
const PORT = process.env.PORT || 3001

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static('public'));

// GET Route for notes.html page
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//GET Route for index.html page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () =>
    console.log("App listening on PORT 3001!")
);

