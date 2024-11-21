import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { noteService } from "../services/NoteService";

export class NoteController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNote)
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