import auth0provider from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider";
import { bugService } from "../services/BugService";
import { get } from "mongoose";
import { noteService } from "../services/NoteService";
import { trackedBugService } from "../services/TrackedBugService";

export class BugController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('', this.getAllBugs)
            .get('/:bugId', this.getBugById)
            .get('/:bugId/notes', this.getAllNotes)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('/:bugId/trackedbugs', this.getTrackedBugUser)
            .delete('/:bugId', this.deleteBug)
            .put('/:bugId', this.editBug)
            .post('', this.createBug)
    }
    async getTrackedBugUser(request, response, next) {
        try {
            const bugId = request.params.bugId
            const trackedBug = await trackedBugService.getTrackedBugUser(bugId)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }

    async getAllNotes(request, response, next) {
        try {
            const bugId = request.params.bugId
            const notes = await noteService.getAllNotes(bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }
    async deleteBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const updateBugData = request.body
            const userInfo = request.userInfo
            const bug = await bugService.deleteBug(bugId, updateBugData, userInfo.id)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
    async editBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const updateData = request.body
            const userInfo = request.userInfo
            const updatedBug = await bugService.editBug(bugId, updateData, userInfo.id)
            response.send(updatedBug)
        } catch (error) {
            next(error)
        }
    }
    async getBugById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugs = await bugService.getBugById(bugId)
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async getAllBugs(request, response, next) {
        try {
            const bugs = await bugService.getAllBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }
    async createBug(request, response, next) {
        try {
            const bugData = request.body
            const userInfo = request.userInfo
            bugData.creatorId = userInfo.id
            const bug = await bugService.createBug(bugData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }


}