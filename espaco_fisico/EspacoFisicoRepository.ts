import { database } from '../database/database.ts'
import type { EspacoFisico, EspacoFisicoInput, EspacoFisicoOptional } from '../models/EspacoFisicoModel.ts'

export class EspacoFisicoRepository {
    public async createEspacoFisico(espacoFisico: EspacoFisicoInput): Promise<EspacoFisico> {
        const [novoEspacoFisico] = await database<EspacoFisico>('espaco_fisico')
            .insert(espacoFisico)
            .returning('*')
        return novoEspacoFisico
    }

    public async getEspacoFisico(id: number): Promise<EspacoFisico | undefined> {
        return database<EspacoFisico>('espaco_fisico')
            .select('*')
            .where({ id })
            .first()
    }

    public async listEspacosFisicos(offset: number, limit: number): Promise<EspacoFisico[]> {
        return database<EspacoFisico>('espaco_fisico')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateEspacoFisico(id: number, espacoFisico: EspacoFisicoOptional): Promise<void> {
        await database<EspacoFisico>('espaco_fisico')
            .update(espacoFisico)
            .where({ id })
    }

    public async deleteEspacoFisico(id: number): Promise<void> {
        await database<EspacoFisico>('espaco_fisico')
            .delete()
            .where({ id })
    }
}
