import { dbContext } from "../db/DbContext"

class TrackedBugService {
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