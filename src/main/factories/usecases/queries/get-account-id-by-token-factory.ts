import { env } from '@/main/config'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
import { GetAccountIdByTokenMongoRepository } from '@/infra/db/mongodb/queries'
import { JwtAdapter } from '@/infra/cryptography'

export class GetAccountIdByTokenFactory {
  public static readonly makeGetAccountIdByToken = (): GetAccountIdByToken => {
    const getAccountIdByTokenRepository = new GetAccountIdByTokenMongoRepository()
    const decrypter = new JwtAdapter(env.jwtSecret)
    return new DbGetAccountIdByToken(decrypter, getAccountIdByTokenRepository)
  }
}
