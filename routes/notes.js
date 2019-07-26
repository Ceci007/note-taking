const express = require("express");
const router = express.Router();
const Note = require("../models/note.js");

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getNote, (req, res) => {
    res.json(res.note);
});

router.post("/", async (req, res) => {
    const note = new Note({
        note: req.body.note
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: "deleted note." });
    } catch (err) {
        res.status(500).json({ message: "could not find note." });
    }
});

router.patch("/:id", getNote, async (req, res) => {
    if(req.body.note != null) {
        res.note.note = req.body.note;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: "note not updated." });
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if(note == null) {
            return res.status(404), json({ message: "cannot find note." });
        }
    } catch (err) {
        return res.status(500).json({ message: "the id selected was not found." });
    }
    res.note = note;
    next();
}

module.exports = router;