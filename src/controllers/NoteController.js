import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { noteService } from "../services/NoteService";

export class NoteController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:noteId', this.deleteNotes)
            .post('', this.createNote)
    }
    async deleteNotes(request, response, next) {
        try {
            const noteId = request.params.noteId
            const updateBugData = request.body
            const userInfo = request.userInfo
            const note = await noteService.deleteNotes(noteId, updateBugData, userInfo.id)
            response.send(note)
        } catch (error) {
            next(error)
        }
    }
    async createNote(request, response, next) {
        try {
            const noteData = request.body
            const userInfo = request.userInfo
            noteData.creatorId = userInfo.id
            const note = await noteService.createNote(noteData)
            response.send(note)
        } catch (error) {
            next(error)
        }
    }
}