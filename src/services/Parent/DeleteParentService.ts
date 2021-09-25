import { getRepository } from 'typeorm'
import Parent from '../../models/Parent'
import AppError from '../../errors/AppError'
import { isUuid } from 'uuidv4'

interface ParentReturn {
  id: string;
  name: string;
  age: number;
  pedigree: boolean;
}

class DeleteParentService {
  public async execute (id: string): Promise<ParentReturn | undefined> {
    const parentRepository = getRepository(Parent)

    if (!isUuid(id)) {
      throw new AppError({ message: 'ID invalid', statusCode: 400 })
    }

    try {
      const parentExists = await parentRepository.findOne({ id })

      if (!parentExists) {
        throw new AppError({ message: 'Pet Parent not found', statusCode: 400 })
      }

      await parentRepository.delete(parentExists.id)

      return parentExists
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 401 })
      }
    }
  }
}

export default DeleteParentService
