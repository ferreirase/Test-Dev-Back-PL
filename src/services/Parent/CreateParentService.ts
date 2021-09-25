import { getRepository } from 'typeorm'
import Parent from '../../models/Parent'
import AppError from '../../errors/AppError'
import { IParent } from '../../interfaces/index'

interface ParentReturn {
  id: string;
  name: string;
  age: number;
  pedigree: boolean;
}

class CreateParentService {
  public async execute ({
    name,
    age,
    pedigree
  }: IParent): Promise<ParentReturn | undefined> {
    const parentRepository = getRepository(Parent)

    try {
      const parentExists = await parentRepository.findOne({
        where: {
          name
        }
      })

      if (parentExists) {
        throw new AppError({ message: 'Pet Parent already exists', statusCode: 400 })
      }

      const newParent = parentRepository.create({
        name,
        age,
        pedigree
      })

      await parentRepository.save(newParent)

      return {
        id: newParent.id,
        name: newParent.name,
        age: newParent.age,
        pedigree: newParent.pedigree
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 401 })
      }
    }
  }
}

export default CreateParentService
