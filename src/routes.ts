import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleware'

import AuthController from './app/controllers/AuthController'
import UsuarioController from './app/controllers/UsuarioController'

const router = Router()

router.post('/auth', AuthController.authenticate)
router.post('/usuarios', UsuarioController.store)
router.get('/usuarios', authMiddleware, UsuarioController.index)

export default router
