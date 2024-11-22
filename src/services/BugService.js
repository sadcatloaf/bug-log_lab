import { Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class BugService {
    async deleteBug(bugId, updateBugData, userId) {
        const bugs = await dbContext.Bugs.findById(bugId)
        if (bugs == null) {
            throw new Error(`Invalid bug ID${bugId}`)
        }
        if (userId != bugs.creatorId) {
            throw new Forbidden('Tricked again cant delete haha')
        }
        await bugs.deleteOne()
        return bugs
    }
    async editBug(bugId, updateData, userInfo) {
        const originalBug = await dbContext.Bugs.findById(bugId)
        if (!originalBug) { throw new Error(`NO BUGS FOR YOU, ${bugId}`) }
        if (userInfo != originalBug.creatorId) {
            throw new Forbidden('You cant update that you dont own it')
        }
        if (updateData.description) originalBug.description = updateData.description
        originalBug.closed ??= updateData.closed
        originalBug.title = updateData.title || originalBug.title
        await originalBug.save()
        return originalBug
    }
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