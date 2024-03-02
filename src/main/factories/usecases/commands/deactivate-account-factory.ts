import { type DeactivateAccount } from '@/domain/usecases/commands'
import { DbDeactivateAccount } from '@/application/usecases/commands'
import { CheckAccountByIdMongoRepository } from '@/infra/db/mongodb/queries'
import { DeactivateAccountMongoRepository } from '@/infra/db/mongodb/commands'

export class DeactivateAccountFactory {
  public static readonly makeDeactivateAccount = (): DeactivateAccount => {
    const checkAccountByIdRepository = new CheckAccountByIdMongoRepository()
    const deactivateAccountRepository = new DeactivateAccountMongoRepository()
    return new DbDeactivateAccount(checkAccountByIdRepository, deactivateAccountRepository)
  }
}
