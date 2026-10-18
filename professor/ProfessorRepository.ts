import type { Professor, ProfessorInput, ProfessorOptional } from '../models/ProfessorModel.ts';
import { database } from '../database/database.ts';

export class ProfessorRepository {
    public async createProfessor(professor: ProfessorInput): Promise<Professor> {
        const [novoProfessor] = await database<Professor>('professor')
            .insert(professor)
            .returning("*")

        return novoProfessor
    }

    public async getProfessor(id: number): Promise<Professor | undefined> {
        return await database('professor')
            .select("*")
            .where({id})
            .first()
    }

    public async listProfessores(offset: number, limit: number): Promise<Professor[]> {
        return await database('professor')
            .select("*")
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateProfessor(id: number, professor: ProfessorOptional): Promise<void> {
        await database('professor')
            .update(professor)
            .where({id})
    }

    public async deleteProfessor(id: number): Promise<void> {
        await database('professor')
            .delete()
            .where({id})
    }

    public async getByCpf(cpf: string): Promise<Professor | undefined> {
        return await database('professor')
            .select("*")
            .where({cpf})
            .first()
    }
}
