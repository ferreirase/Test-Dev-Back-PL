import { getRepository } from 'typeorm'
import Parent from '../../models/Parent'
import AppError from '../../errors/AppError'
import { IParentUpdate } from '../../interfaces/index'
import { isUuid } from 'uuidv4'

interface ParentReturn {
  id: string;
  name: string;
  age: number;
  pedigree: boolean;
}

class UpdateParentService {
  public async execute (id: string, { name, age, pedigree }: IParentUpdate): Promise<ParentReturn | undefined> {
    const parentRepository = getRepository(Parent)

    if (!isUuid(id)) {
      throw new AppError({ message: 'ID invalid', statusCode: 400 })
    }

    try {
      const parentNameExists = await parentRepository.find({ name })
        .then((parent) => parent.filter((p) => p.id !== id))

      if (parentNameExists && parentNameExists.length) {
        throw new AppError({ message: 'Pet name already exists', statusCode: 400 })
      }

      const parentExists = await parentRepository.findOne({ id })

      if (!parentExists) {
        throw new AppError({ message: 'Pet Parent not found', statusCode: 400 })
      }

      parentExists.name = name ?? parentExists.name
      parentExists.age = age ?? parentExists.age
      parentExists.pedigree = pedigree ?? parentExists.pedigree

      await parentRepository.save(parentExists)

      return {
        id: parentExists.id,
        name: parentExists.name,
        age: parentExists.age,
        pedigree: parentExists.pedigree
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 401 })
      }
    }
  }
}

export default UpdateParentService
