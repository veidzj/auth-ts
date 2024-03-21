import { type ChangeProfileImage } from '@/domain/usecases/commands'
import { DbChangeProfileImage } from '@/application/usecases/commands'
import { CheckAccountByIdMongoRepository } from '@/infra/db/mongodb/queries'
import { ChangeProfileImageMongoRepository } from '@/infra/db/mongodb/commands'

export class ChangeProfileImageFactory {
  public static readonly makeChangeProfileImage = (): ChangeProfileImage => {
    const checkAccountByIdRepository = new CheckAccountByIdMongoRepository()
    const changeProfileImageRepository = new ChangeProfileImageMongoRepository()
    return new DbChangeProfileImage(checkAccountByIdRepository, changeProfileImageRepository)
  }
}
