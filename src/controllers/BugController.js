import auth0provider from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider";
import { bugService } from "../services/BugService";
import { get } from "mongoose";

export class BugController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('', this.getAllBugs)
            .get('/:bugId', this.getBugById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:bugId', this.editBug)
            .post('', this.createBug)
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