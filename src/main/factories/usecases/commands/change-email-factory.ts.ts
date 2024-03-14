import { type ChangeEmail } from '@/domain/usecases/commands'
import { DbChangeEmail } from '@/application/usecases/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { ChangeEmailMongoRepository } from '@/infra/db/mongodb/commands'

export class ChangeEmailFactory {
  public static readonly makeChangeEmail = (): ChangeEmail => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const changeEmailRepository = new ChangeEmailMongoRepository()
    return new DbChangeEmail(checkAccountByEmailRepository, changeEmailRepository)
  }
}
