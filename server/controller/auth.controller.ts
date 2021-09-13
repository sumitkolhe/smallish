import { RequestHandler } from 'express'
import { serialize } from 'cookie'
import { AuthService } from '@server/services/auth.service'
import { Logger } from '@server/utils/logger'
import { User } from '@server/interfaces/user'
import { globalConfig } from '@server/config/global'
import { CreateError } from '@server/middleware/errorHandler'
import { isDev } from '@server/utils/isDev'

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    if (!globalConfig.allowRegistration) throw new CreateError(403, 'Registration is disabled!')

    const registrationPayload: Pick<User, 'email' | 'password' | 'name'> = req.body

    await AuthService.register(registrationPayload)

    res.json({ message: 'User registered successfully' })
  } catch (error) {
    Logger.error(`error registering user. Exception : ${error.message}`)
    next(error)
  }
}

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const { accessToken } = await AuthService.login({ email, password })

    res.setHeader(
      'Set-Cookie',
      serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: !isDev(),
        sameSite: true,
        path: '/',
      })
    )
    res.json({ message: 'success' })
  } catch (error) {
    Logger.error(`error logging in user. Exception : ${error.message}`)
    next(error)
  }
}

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.params

    await AuthService.verifyUser(token)
    res.json('verified')
  } catch (error) {
    Logger.error(`error verifying email. Exception : ${error.message}`)
    next(error)
  }
}
