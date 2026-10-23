import { database } from '../database/database.ts'
import type { Turma, TurmaInput, TurmaOptional } from '../models/TurmaModel.ts'

export class TurmaRepository {
    public async createTurma(turma: TurmaInput): Promise<Turma> {
        const [novaTurma] = await database<Turma>('turma')
            .insert(turma)
            .returning('*')

        return novaTurma
    }

    public async getTurma(id: number): Promise<Turma | undefined> {
        return database<Turma>('turma')
            .select('*')
            .where({ id })
            .first()
    }

    public async listTurmas(limit: number, page: number): Promise<Turma[]> {
        const offset = limit * (page - 1)
        
        return database<Turma>('turma')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateTurma(id: number, turma: TurmaOptional): Promise<void> {
        await database<Turma>('turma')
            .update(turma)
            .where({ id })
    }

    public async deleteTurma(id: number): Promise<void> {
        await database<Turma>('turma')
            .delete()
            .where({ id })
    }
}
