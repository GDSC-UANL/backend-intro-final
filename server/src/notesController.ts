import { Note } from './models';
import { SavedNotes } from './database';
import { Router } from 'express'
import { isValidObjectId } from 'mongoose';

export let notesRouter = Router()


notesRouter.get("/", async (req, res) => {

    let savedNotes = await SavedNotes.find()
    res.json(savedNotes)
})

notesRouter.post("/", async (req, res) => {

    let note: Note = req.body

    if (note == null)
        return res.status(400).send("Datos vacios")

    if (note.content == null || note.content == "")
        return res.status(400).send("El contenido de la nota no puede estar vacío")

    if (note.title == null || note.title == "")
        return res.status(400).send("El titulo de la nota no puede estar vacío")

    note.datePublished = new Date()
    let newNote = await SavedNotes.create(note)

    res.status(200).json(newNote)
})

notesRouter.put("/:id", async (req, res) => {
    let id = req.params.id

    if (isValidObjectId(id) == false)
        return res.status(400).send("El id no es válido")

    let exists = await SavedNotes.exists({ _id: id })

    if (exists == false)
        return res.status(404).send("Nota no encontrada")

    let note: Note = req.body

    if (note == null)
        return res.status(400).send("Datos vacios")

    if (note.content == null || note.content == "")
        return res.status(400).send("El contenido de la nota no puede estar vacío")

    if (note.title == null || note.title == "")
        return res.status(400).send("El titulo de la nota no puede estar vacío")

    let updatedNote = await SavedNotes.findByIdAndUpdate(id, note)

    res.status(200).json(updatedNote)

})

notesRouter.delete("/:id", async (req, res) => {

    let id = req.params.id

    if (isValidObjectId(id) == false)
        return res.status(400).send("El id no es válido")

    let exists = await SavedNotes.exists({ _id: id })

    if (exists == false)
        return res.status(404).send("Nota no encontrada")

    let deletedNote = await SavedNotes.findByIdAndDelete(id)

    res.status(200).json(deletedNote)

})