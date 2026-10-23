import { database } from '../database/database.ts'
import type { Avaliacao, AvaliacaoInput, AvaliacaoOptional } from '../models/AvaliacaoModel.ts'

export class AvaliacaoRepository {
    public async createAvaliacao(avaliacao: AvaliacaoInput): Promise<Avaliacao> {
        const [novaAvaliacao] = await database<Avaliacao>('avaliacao')
            .insert(avaliacao)
            .returning('*')

        return novaAvaliacao
    }

    public async getAvaliacao(id: number): Promise<Avaliacao | undefined> {
        return database<Avaliacao>('avaliacao')
            .select('*')
            .where({ id })
            .first()
    }

    public async listAvaliacoes(limit: number, page: number): Promise<Avaliacao[]> {
        const offset = limit * (page - 1)
        return database<Avaliacao>('avaliacao')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateAvaliacao(id: number, avaliacao: AvaliacaoOptional): Promise<void> {
        await database<Avaliacao>('avaliacao')
            .update(avaliacao)
            .where({ id })
    }

    public async deleteAvaliacao(id: number): Promise<void> {
        await database<Avaliacao>('avaliacao')
            .delete()
            .where({ id })
    }
}
