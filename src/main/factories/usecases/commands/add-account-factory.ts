import { env } from '@/main/config'
import { type AddAccount } from '@/domain/usecases/commands'
import { DbAddAccount } from '@/application/usecases/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { BcryptAdapter } from '@/infra/cryptography'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/commands'

export class AddAccountFactory {
  public static readonly makeAddAccount = (): AddAccount => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const hasher = new BcryptAdapter(env.salt)
    const addAccountRepository = new AddAccountMongoRepository()
    return new DbAddAccount(checkAccountByEmailRepository, hasher, addAccountRepository)
  }
}
