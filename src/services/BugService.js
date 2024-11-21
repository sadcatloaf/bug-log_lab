import { dbContext } from "../db/DbContext"

class BugService {
    async getBugById(bugId) {
        const bugs = await dbContext.Bugs.findById(bugId).populate('creator')
        if (bugs == null) {
            throw new Error(`Invalid bug ID${bugId}`)
        }
        return bugs
    }
    async getAllBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }
    async createBug(bugData) {
        const bug = await dbContext.Bugs.create(bugData)
        await bug.populate('creator')
        return bug
    }

}

export const bugService = new BugService()