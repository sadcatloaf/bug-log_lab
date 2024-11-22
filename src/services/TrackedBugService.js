import { dbContext } from "../db/DbContext"

class TrackedBugService {
    async createTrackedBug(trackedBugData) {
        const trackedBug = await dbContext.TrackedBugs.create(trackedBugData)
        await trackedBug.populate('bug')
        await trackedBug.populate('tracker')
        return trackedBug
    }

}
export const trackedBugService = new TrackedBugService()