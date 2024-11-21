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
            .post('', this.createBug)
    }
    async getBugById(request, response, next) {
        const bugId = request.params.bugId
        const bugs = await bugService.getBugById(bugId)
        response.send(bugs)
    }

    async getAllBugs(request, response, next) {
        const bugs = await bugService.getAllBugs()
        response.send(bugs)
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