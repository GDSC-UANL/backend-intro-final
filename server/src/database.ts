import mongoose, { Schema, model } from 'mongoose'

export async function connectDatabase() {
    await mongoose.connect("mongodb://localhost/taller")
    console.log("Base de datos conectada")
}

let notesSchema = new Schema({
    title: String,
    content: String,
    datePublished: Date
})

export const SavedNotes = model("notes", notesSchema)
