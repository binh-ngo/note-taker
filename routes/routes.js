// Dependencies
const fs = require('fs');
const path = require('path');

var uniqid = require('uniqid');
module.exports = (app) => {

        // API routes

        // Get route setup | takes the db.json file and returns all saved notes as JSON
        app.get("/api/notes", (req, res) => {
            res.sendFile(path.join(__dirname, '../db/db.json'));
        });
        // Post route setup | receives the users note and adds it to the note db and returns it
        app.post("/api/notes", (req, res) => {
            let userNotes = fs.readFileSync('db/db.json');
            userNotes = JSON.parse(userNotes);
            res.json(userNotes);
            let noteObj = {
                title: req.body.title,
                text: req.body.text,
                id: uniqid()
            };
            userNotes.push(noteObj);
            fs.writeFileSync('db/db.json', JSON.stringify(userNotes));
            res.json(userNotes);
        });

        app.delete('/api/notes/:id', (req, res) => {
            let userNotes = JSON.parse(fs.readFileSync('db/db.json'))
            let deleteNote = userNotes.filter(item => item.id !== req.params.id);
            fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
            res.json(deleteNote);
        })
                    // View Routes
        // Displays notes.html when the user navigates to /notes
        app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, "../public/notes.html")));

        // Display index.html on every route 
        app.get('*', (req,res) => res.sendFile(path.join(__dirname, "../public/index.html")));
}
