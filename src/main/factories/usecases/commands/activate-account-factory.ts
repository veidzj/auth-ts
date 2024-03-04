import { type ActivateAccount } from '@/domain/usecases/commands'
import { DbActivateAccount } from '@/application/usecases/commands'
import { CheckAccountByIdMongoRepository } from '@/infra/db/mongodb/queries'
import { ActivateAccountMongoRepository } from '@/infra/db/mongodb/commands'

export class ActivateAccountFactory {
  public static readonly makeActivateAccount = (): ActivateAccount => {
    const checkAccountByIdRepository = new CheckAccountByIdMongoRepository()
    const activateAccountRepository = new ActivateAccountMongoRepository()
    return new DbActivateAccount(checkAccountByIdRepository, activateAccountRepository)
  }
}
