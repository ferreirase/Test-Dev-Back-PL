import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Children from '../models/Children'
import CreateChildrenService from '../services/Children/CreateChildrenService'
import UpdateChildrenService from '../services/Children/UpdateChildrenService'
import AppError from '../errors/AppError'
import { isUuid } from 'uuidv4'
import ensureAuth from '../middlewares/ensureAuthenticated'

const childrenRoutes = Router()

childrenRoutes.get('/', async (_: Request, res: Response) => {
  const childrenRepository = getRepository(Children)

  const childrens = await childrenRepository.find({
    select: ['id', 'name', 'age', 'vaccinated']
  })

  return res.status(200).json(childrens)
})

childrenRoutes.get('/:parent_id', async (req: Request, res: Response) => {
  const childrenRepository = getRepository(Children)
  const { parent_id } = req.params

  if (!isUuid(parent_id)) {
    throw new AppError({ message: 'Parent ID invalid', statusCode: 400 })
  }

  const childrens = await childrenRepository.find({
    where: { parent_id },
    select: ['id', 'name', 'age', 'vaccinated']
  })

  return res.status(200).json(childrens)
})

childrenRoutes.post('/', ensureAuth, async (req: Request, res: Response) => {
  const createChildren = new CreateChildrenService()

  const newParent = await createChildren.execute(req.body)

  return res.status(200).json(newParent)
})

childrenRoutes.put('/:id', ensureAuth, async (req: Request, res: Response) => {
  const { id } = req.params

  const updateChildren = new UpdateChildrenService()

  const childrenUpdated = await updateChildren.execute(id, req.body)

  return res.status(200).json(childrenUpdated)
})

export default childrenRoutes
