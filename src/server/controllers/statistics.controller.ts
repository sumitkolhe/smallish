import { StatisticsService } from 'server/services/statistics.service'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import type { CustomResponse } from 'interfaces/response.interface'
import type { StatisticsPeriod } from 'interfaces/statistics.interface'

export class StatisticsController {
  private statisticsService: StatisticsService

  constructor() {
    this.statisticsService = new StatisticsService()
  }

  public overviewStats: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { email } = req.auth

      const visitStats = await this.statisticsService.getOverviewStats(email)

      return res.json({ status: 'SUCCESS', message: null, data: visitStats })
    } catch (error) {
      next(error)
    }
  }

  public visitStats: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params
      const { period } = req.query

      const visitStats = await this.statisticsService.getVisitStats(
        alias,
        period as StatisticsPeriod
      )

      return res.json({ status: 'SUCCESS', message: null, data: visitStats })
    } catch (error) {
      next(error)
    }
  }

  public deviceStats: RequestHandler = async (
    req: Request,
    res: Response<CustomResponse<any>>,
    next: NextFunction
  ) => {
    try {
      const { alias } = req.params
      const { period } = req.query

      const visitStats = await this.statisticsService.getDeviceStats(
        alias,
        period as StatisticsPeriod
      )

      return res.json({ status: 'SUCCESS', message: null, data: visitStats })
    } catch (error) {
      next(error)
    }
  }
}
