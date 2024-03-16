import { type Controller } from '@/presentation/protocols'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/commands'
import { LogErrorDecorator } from '@/main/decorators'

export const makeLogErrorDecorator = (controller: Controller): Controller => {
  const logErrorRepository = new LogErrorMongoRepository()
  return new LogErrorDecorator(controller, logErrorRepository)
}
