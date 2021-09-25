import { getRepository } from 'typeorm'
import Children from '../../models/Children'
import AppError from '../../errors/AppError'
import Parent from '../../models/Parent'
import { IChildrenUpdate } from '../../interfaces/index'
import { isUuid } from 'uuidv4'

interface ChildrenReturn {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  vaccinated: boolean;
}

class UpdateChildrenService {
  public async execute (id: string, {
    parent_id,
    name,
    age,
    vaccinated
  }: IChildrenUpdate): Promise<ChildrenReturn | undefined> {
    const childrenRepository = getRepository(Children)
    const parentRepository = getRepository(Parent)

    if (!isUuid(id)) {
      throw new AppError({ message: 'Children ID invalid', statusCode: 400 })
    }

    if (parent_id && !isUuid(parent_id)) {
      throw new AppError({ message: 'Parent ID invalid', statusCode: 400 })
    }

    try {
      if (parent_id && !await parentRepository.findOne({
        id: parent_id
      })) {
        throw new AppError({ message: 'Parent not found', statusCode: 400 })
      }

      const childrenNameExists = await childrenRepository.find({ name })
        .then((child) => child.filter((c) => c.id !== id))

      if (childrenNameExists && childrenNameExists.length) {
        throw new AppError({ message: 'Pet Children name already exists', statusCode: 400 })
      }

      const childrenExists = await childrenRepository.findOne({ id })

      if (!childrenExists) {
        throw new AppError({ message: 'Pet Children not found', statusCode: 400 })
      }

      childrenExists.name = name ?? childrenExists.name
      childrenExists.age = age ?? childrenExists.age
      childrenExists.parent_id = parent_id ?? childrenExists.parent_id
      childrenExists.vaccinated = vaccinated ?? childrenExists?.vaccinated

      await childrenRepository.save(childrenExists)

      return {
        id: childrenExists.id,
        parent_id: childrenExists.parent_id,
        name: childrenExists.name,
        age: childrenExists.age,
        vaccinated: childrenExists.vaccinated
      }
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 401 })
      }
    }
  }
}

export default UpdateChildrenService
