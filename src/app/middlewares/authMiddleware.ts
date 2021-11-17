import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: 'Token não informado'
    })
  }

  const [, token] = authorization.split(' ')

  try {
    const data = jwt.verify(token, 'secret')
    const { id } = data as TokenPayload

    req.userId = id

    return next()
  } catch (error) {
    return res.sendStatus(401).json({
      error: 'Token inválido'
    })
  }
}
