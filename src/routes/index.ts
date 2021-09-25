import { Router, Response } from 'express'
import parentRoutes from './parent.routes'
import childrenRoutes from './children.routes'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth'

const routes = Router()

routes.get('/token', (_, res: Response) => {
  return res.status(200).json({
    token: jwt.sign({
      data: ''
    }, `${authConfig.jwt.secret}`, { expiresIn: authConfig.jwt.expiresIn })
  })
})

routes.use('/parents', parentRoutes)
routes.use('/childrens', childrenRoutes)

export default routes
