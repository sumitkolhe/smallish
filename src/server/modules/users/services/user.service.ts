import { ErrorType } from 'interfaces/error.interface'
import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import type { User } from 'interfaces/user.interface'
import { UserModel } from '~/server/modules/users/models/user.model'

export class UserService {
  public me = async (email: string): Promise<User> => {
    const userDetails = await UserModel.findOne(
      { email },
      {
        _id: false,
        __v: false,
        userLinks: false,
        apiKey: false,
        password: false,
      }
    )

    if (!userDetails) throw new HttpExceptionError(404, ErrorType.userNotFound)

    return userDetails.toObject<User>()
  }
}
