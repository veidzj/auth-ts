import { env } from '@/main/config'
import { type Authentication } from '@/domain/usecases/queries'
import { DbAuthentication } from '@/application/usecases/queries'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/commands'

export class AuthenticationFactory {
  public static readonly makeAuthentication = (): Authentication => {
    const getAccountByEmailRepository = new GetAccountByEmailMongoRepository()
    const hashComparer = new BcryptAdapter(Number(env.salt))
    const encrypter = new JwtAdapter(env.jwtSecret)
    const updateAccessTokenRepository = new UpdateAccessTokenMongoRepository()
    return new DbAuthentication(getAccountByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository)
  }
}
