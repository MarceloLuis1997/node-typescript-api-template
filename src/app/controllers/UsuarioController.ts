import { Request, Response } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'

import Usuario from '../models/Usuario'
import UsuarioRepository from '../repositories/UsuarioRepository'

class UsuarioController {
  async index (req: Request, res: Response) {
    const repository = getCustomRepository(UsuarioRepository)
    const usuarios = await repository.find({ select: ['id', 'nome', 'email'] })

    return res.send({
      userId: req.userId,
      usuarios
    })
  }

  async store (req: Request, res: Response) {
    const repository = getRepository(Usuario)
    const { nome, email, senha } = req.body

    const userExists = await repository.findOne({ where: { email } })

    if (userExists) {
      return res.sendStatus(409)
    }

    const user = repository.create({ nome, email, senha })
    await repository.save(user)

    return res.json(user)
  }
}

export default new UsuarioController()
