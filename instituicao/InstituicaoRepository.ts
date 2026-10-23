import type { Instituicao, InstituicaoInput, InstituicaoOptional } from '../models/InstituicaoModel.ts';
import {database} from '../database/database.ts'

export class InstituicaoRepository {
    public async createInstituicao(instituicao: InstituicaoInput): Promise<Instituicao> {
        const [novaInstituicao] = await database<Instituicao>('instituicao')
            .insert(instituicao)
            .returning("*")

        return novaInstituicao
    }

    public async getInstituicao(id: number): Promise<Instituicao | undefined> {
        return await database('instituicao')
            .select("*")
            .where({id})
            .first()
    }

    public async listInstituicoes(limit: number, page: number): Promise<Instituicao[]> {
        const offset = limit * (page - 1)
        
        return await database<Instituicao>('instituicao')
            .select("*")
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateInstituicao(id: number, instituicao: InstituicaoOptional): Promise<void> {
        await database('instituicao')
            .update(instituicao)
            .where({id})
    }

    public async deleteInstituicao(id: number): Promise<void> {
        await database('instituicao')
            .delete()    
            .where({id})
            
    }

    public async getByCnpj(cnpj: string): Promise<Instituicao | undefined> {
        return await database('instituicao')
            .select("*")
            .where({cnpj})
            .first()
    }
}
