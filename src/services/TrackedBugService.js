import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class TrackedBugService {
    async deleteTrackedBug(trackedBugId, userId, updateBugData) {
        const trackedBug = await dbContext.TrackedBugs.findById(trackedBugId)
        if (trackedBug == null) {
            throw new Error('wrong freaken bug brah')
        }
        if (userId != trackedBug.accountId) {
            throw new Forbidden('Oh well cant deletre again wow')
        }
        await trackedBug.deleteOne()
        return trackedBug
    }
    async getMyTrackedBugs(userInfo) {
        const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userInfo }).populate('bug')
        return trackedBugs
    }

    async getTrackedBugUser(bugId) {
        const trackedBug = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker')

        return trackedBug
    }
    async createTrackedBug(trackedBugData) {
        const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
        await trackedBug.populate('bug')
        await trackedBug.populate('tracker')
        return trackedBug
    }

}
export const trackedBugService = new TrackedBugService()