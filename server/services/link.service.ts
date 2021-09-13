import { CreateError } from '@server/middleware/errorHandler'
import { Link } from '@server/interfaces/links'
import { generateUniqueAlias } from '@server/helpers/createAlias'
import { globalConfig } from '@server/config/global'
import { LinkModel } from '@server/models/link.model'

export class LinkService {
  static shortenLink = async (linkPayload: Link): Promise<Link> => {
    const uniqueAlias = linkPayload.alias ? linkPayload.alias : await generateUniqueAlias()

    const newLink = new LinkModel({
      alias: uniqueAlias,
      shortUrl: `${globalConfig.websiteDomain}/${uniqueAlias}`,
      longUrl: linkPayload.longUrl,
      description: linkPayload.description,
      passwordProtected: linkPayload.password ? true : false,
      password: linkPayload.password,
    })

    const savedLink: Link = await newLink.save().catch(() => {
      throw CreateError.BadRequest('Alias is already in use')
    })
    return savedLink
  }
}
