import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { trackedBugService } from '../services/TrackedBugService'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/trackedbugs', this.getMyTrackedBugs)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
  }
  async getMyTrackedBugs(request, response, next) {
    try {
      const userInfo = request.userInfo
      const trackedBug = await trackedBugService.getMyTrackedBugs(userInfo.id)
      response.send(trackedBug)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

}
