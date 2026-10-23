import { database } from '../database/database.ts'
import type { Curso, CursoInput, CursoOptional } from '../models/CursoModel.ts'

export class CursoRepository {
    public async createCurso(curso: CursoInput): Promise<Curso> {
        const [novoCurso] = await database<Curso>('curso')
            .insert(curso)
            .returning('*')

        return novoCurso
    }

    public async getCurso(id: number): Promise<Curso | undefined> {
        return database<Curso>('curso')
            .select('*')
            .where({ id })
            .first()
    }

    public async listCursos(limit: number, page: number): Promise<Curso[]> {
        const offset = limit * (page - 1)
        return database<Curso>('curso')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateCurso(id: number, curso: CursoOptional): Promise<void> {
        await database<Curso>('curso')
            .update(curso)
            .where({ id })
    }

    public async deleteCurso(id: number): Promise<void> {
        await database<Curso>('curso')
            .delete()
            .where({ id })
    }
}
