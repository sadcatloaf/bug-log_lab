import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class NoteService {
    async deleteNotes(noteId, updateBugData, userId) {
        const notes = await dbContext.Notes.findById(noteId)
        if (notes == null) {
            throw new Error(`Invalid note ID${noteId}`)
        }
        if (userId != notes.creatorId) {
            throw new Forbidden('HAHA cant delete')
        }
        await notes.deleteOne()
        return notes
    }
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