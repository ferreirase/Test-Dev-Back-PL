import { Router, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import ParentRepository from '../repositories/ParentRepository'
import CreateParentService from '../services/Parent/CreateParentService'
import UpdateParentService from '../services/Parent/UpdateParentService'
import DeleteParentService from '../services/Parent/DeleteParentService'
import ensureAuth from '../middlewares/ensureAuthenticated'

const parentRoutes = Router()

parentRoutes.get('/', async (_: Request, res: Response) => {
  const parentRepository = getCustomRepository(ParentRepository)

  const parents = await parentRepository.findAll()

  return res.status(200).json(parents)
})

parentRoutes.post('/', async (req: Request, res: Response) => {
  const createParent = new CreateParentService()

  const newParent = await createParent.execute(req.body)

  return res.status(200).json(newParent)
})

parentRoutes.put('/:id', ensureAuth, async (req: Request, res: Response) => {
  const { id } = req.params

  const updateParent = new UpdateParentService()

  const parentUpdated = await updateParent.execute(id, req.body)

  return res.status(200).json(parentUpdated)
})

parentRoutes.delete('/:id', ensureAuth, async (req: Request, res: Response) => {
  const { id } = req.params

  const deleteParent = new DeleteParentService()

  const parentDeleted = await deleteParent.execute(id)

  return res.status(200).json(parentDeleted)
})

export default parentRoutes
