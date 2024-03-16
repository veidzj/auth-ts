import { type Controller } from '@/presentation/protocols'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/commands'
import { LogControllerDecorator } from '@/main/decorators'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogErrorMongoRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
