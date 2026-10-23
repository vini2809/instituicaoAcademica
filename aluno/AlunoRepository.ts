import { database } from '../database/database.ts'
import type { Aluno, AlunoInput, AlunoOptional } from '../models/AlunoModel.ts'

export class AlunoRepository {
    public async createAluno(aluno: AlunoInput): Promise<Aluno> {
        const [novoAluno] = await database<Aluno>('aluno')
            .insert(aluno)
            .returning("*")

        return novoAluno
    }

    public async getById(id: number): Promise<Aluno | undefined> {
        const aluno = await database<Aluno>('aluno')
            .select("*")
            .where({id})
            .first() 

        if (!aluno) {
            return undefined
        }

        return aluno
    }

    public async listAlunos(limit: number, page: number): Promise<Aluno[]> {
        const offset = limit * (page - 1)
        
        return await database<Aluno>('aluno')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateAluno(id: number, aluno: AlunoOptional): Promise<void> {
        await database<Aluno>('aluno')
            .update(aluno)
            .where({id})
    }

    public async deleteAluno(id: number): Promise<void> {
        await database<Aluno>('aluno')
            .delete()
            .where({id})
    }

    public async getByCpf(cpf: string): Promise<Aluno | undefined> {
        const aluno = await database<Aluno>('aluno')
            .select("*")
            .where({cpf})
            .first() 

        if (!aluno) {
            return undefined
        }

        return aluno
    }
}