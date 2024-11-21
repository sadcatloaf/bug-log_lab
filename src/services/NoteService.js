import { dbContext } from "../db/DbContext"

class NoteService {
    async getAllNotes(bugId) {
        const notes = await dbContext.Notes.find({ bugId: bugId })
        if (notes == null) {
            throw new Error(`INVALID YOUR FACE${bugId}`)
        }
        return notes
    }
    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator')
        return note
    }

}
export const noteService = new NoteService()