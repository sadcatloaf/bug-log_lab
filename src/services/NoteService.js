import { dbContext } from "../db/DbContext"

class NoteService {
    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator')
        return note
    }

}
export const noteService = new NoteService()