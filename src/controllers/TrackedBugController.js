import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { trackedBugService } from "../services/TrackedBugService";

export class TrackedBugController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:trackedBugId', this.deleteTrackedBug)
            .post('', this.createTrackedBug)

    }
    async deleteTrackedBug(request, response, next) {
        try {
            const trackedBugId = request.params.trackedBugId
            const trackedBug = await trackedBugService.deleteTrackedBug(trackedBugId)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
    async createTrackedBug(request, response, next) {
        try {
            const trackedBugData = request.body
            const userInfo = request.userInfo
            trackedBugData.accountId = userInfo.id
            const trackedBug = await trackedBugService.createTrackedBug(trackedBugData)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }

}