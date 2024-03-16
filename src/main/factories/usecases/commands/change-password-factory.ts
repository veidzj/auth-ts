import { env } from '@/main/config'
import { type ChangePassword } from '@/domain/usecases/commands'
import { DbChangePassword } from '@/application/usecases/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { ChangePasswordMongoRepository } from '@/infra/db/mongodb/commands'
import { BcryptAdapter } from '@/infra/cryptography'

export class ChangePasswordFactory {
  public static readonly makeChangePassword = (): ChangePassword => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const hasher = new BcryptAdapter(Number(env.salt))
    const changeEmailRepository = new ChangePasswordMongoRepository()
    return new DbChangePassword(checkAccountByEmailRepository, hasher, changeEmailRepository)
  }
}
