const routes = require('express').Router();
const fs = require('fs');
const { networkInterfaces } = require('os');
const path = require('path');
const uniqid = require('uniqid'); // npm package to create uniqe IDs for new notes


//GET / api / notes - read db.json
routes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes!`);
    fs.readFile('./db/db.json', (err, data) => {
        res.json(JSON.parse(data))
    })  
});
//POST / api / notes - should receive a new note to save on the request.body and add it to db.json, then return a new note to the client.  need to give each new note  a unique ID when it's saved (use uniqid NPM package to do this)
routes.post('/notes', (req, res) => {
    console.log(req.body);
    console.info(`${req.method} request received to add a new note!`);
    fs.readFile('./db/db.json', (err, data) => {
        let notes = JSON.parse(data);
        let newNote = {title: req.body.title, text: req.body.text, id: uniqid()};
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            res.json(newNote);
        
        })
        
    })  
   
})

//BONUS - add route to DELETE / api/notes/:id should receive a query parameter that contains the id of a note to delete.  To delete a note, you'll need to read all notes from the db.json file, remove th note with the given ID property, and then rewrite notes to the db.json file.


module.exports = routes;