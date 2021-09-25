import { getRepository } from 'typeorm'
import Children from '../../models/Children'
import AppError from '../../errors/AppError'
import Parent from '../../models/Parent'
import { IChildren } from '../../interfaces/index'
import { isUuid } from 'uuidv4'

interface ChildrenReturn {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  vaccinated: boolean;
}

class CreateChildrenService {
  public async execute ({
    parent_id,
    name,
    age,
    vaccinated
  }: IChildren): Promise<ChildrenReturn | undefined> {
    const childrenRepository = getRepository(Children)
    const parentRepository = getRepository(Parent)

    if (!isUuid(parent_id)) {
      throw new AppError({ message: 'Parent ID invalid', statusCode: 400 })
    }

    try {
      const parentExists = await parentRepository.findOne({
        id: parent_id
      })

      if (!parentExists) {
        throw new AppError({ message: 'Parent not found', statusCode: 400 })
      }

      const childrenExists = await childrenRepository.findOne({
        where: {
          parent_id,
          name
        }
      })

      if (childrenExists) {
        throw new AppError({ message: 'Pet Children already exists', statusCode: 400 })
      }

      const newChildren = childrenRepository.create({
        parent_id,
        name,
        age,
        vaccinated
      })

      await childrenRepository.save(newChildren)

      return {
        id: newChildren.id,
        parent_id: newChildren.parent_id,
        name: newChildren.name,
        age: newChildren.age,
        vaccinated: newChildren.vaccinated
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 401 })
      }
    }
  }
}

export default CreateChildrenService
