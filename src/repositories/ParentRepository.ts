import { EntityRepository, Repository } from 'typeorm'
import Parent from '../models/Parent'
import AppError from '../errors/AppError'

@EntityRepository(Parent)
class ParentRepository extends Repository<Parent> {
  public async findAll (): Promise<Array<Parent> | null | undefined> {
    try {
      const parents = this.createQueryBuilder('parent')
        .select(['parent.id', 'parent.name', 'parent.age'])
        .addSelect(['children.id', 'children.name', 'children.age', 'children.vaccinated'])
        .leftJoin('parent.childrens', 'children')
        .getMany()

      return parents || null
    } catch (error) {
      if (error instanceof AppError) {
        throw new AppError({ message: `${error.message}`, statusCode: 400 })
      }
    }
  }
}

export default ParentRepository
