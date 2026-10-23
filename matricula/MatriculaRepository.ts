import { database } from '../database/database.ts'
import type { Matricula, MatriculaInput, MatriculaOptional } from '../models/MatriculaModel.ts'

export class MatriculaRepository {
    public async createMatricula(matricula: MatriculaInput): Promise<Matricula> {
        const [novaMatricula] = await database<Matricula>('matricula')
            .insert(matricula)
            .returning('*')

        return novaMatricula
    }

    public async getMatricula(id: number): Promise<Matricula | undefined> {
        return database<Matricula>('matricula')
            .select('*')
            .where({ id })
            .first()
    }

    public async listMatriculas(limit: number, page: number): Promise<Matricula[]> {
        const offset = limit * (page - 1)
        
        return database<Matricula>('matricula')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateMatricula(id: number, matricula: MatriculaOptional): Promise<void> {
        await database<Matricula>('matricula')
            .update(matricula)
            .where({ id })
    }

    public async deleteMatricula(id: number): Promise<void> {
        await database<Matricula>('matricula')
            .delete()
            .where({ id })
    }
}
