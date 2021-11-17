import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity('usuarios')
class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword () {
      this.senha = bcrypt.hashSync(this.senha, 8)
    }
}

export default Usuario
