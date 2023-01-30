const fs = require('fs');
const path = require('path')

modeule.exports = app => {
    fs.readFile('db/db.json', 'utf-8', (err,data) => {
        if (err) 
        throw err;

        var notes = JSON.parse(data);

        // API routes

        // Get route setup | takes the db.json file and returns all saved notes as JSON
        app.get("/api/notes", (req, res) => res.json(notes))
    });
        // Post route setup | receives the users note and adds it to the note db
        app.post("/api/notes", (req, res) => {
            let userNote = req.body;
            notes.push(newNote);
            updateNotes();
            return console.log(`Created note: ${userNote.title}`);
        });

        // Gets a note by ID | Displays information in JSON that have the provided ID
        app.get("/api/notes/:id", (req, res) => res.json(notes[req.params.id])
        );

        // View Routes
        // Displays notes.html when the user navigates to /notes
        app.get("/notes", (req,res) => res.sendFile(path.join(__dirname, "../public/notes.html")));

        // Display index.html on every route 
        app.get('*', (req,res) => res.sendFile(path.join(__dirname, "../public/index.html")));

        function updateNotes() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t', err => {
                if (err)
                throw err;
                return true;
            }));
        }
}