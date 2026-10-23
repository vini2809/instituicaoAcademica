import type { EspacoFisico, EspacoFisicoInput, EspacoFisicoOptional } from '../models/EspacoFisicoModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { espacoFisicoSchema } from '../schemas/EspacoFisicoSchema.ts'
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts'
import { EspacoFisicoRepository } from './EspacoFisicoRepository.ts'

export class EspacoFisicoService {
    constructor(
        private repository: EspacoFisicoRepository,
        private instituicaoRepository: InstituicaoRepository,
    ) {}

    public async createEspacoFisico(espacoFisico: EspacoFisicoInput): Promise<EspacoFisico> {
        const validado = validarInput<EspacoFisicoInput>(espacoFisicoSchema, espacoFisico);

        await this.validarFkInstituicao(validado.idInstituicao);

        return this.repository.createEspacoFisico(validado)
    }

    public async getEspacoFisico(id: unknown): Promise<EspacoFisico> {
        const espaco = await this.repository.getEspacoFisico(validarId(id));

        if (!espaco) throw new HttpError(404, 'Espaço físico não encontrado')

        return espaco
    }

    public async listEspacosFisicos(limit?: unknown, page?: unknown): Promise<EspacoFisico[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.repository.listEspacosFisicos(paginacao.limit, paginacao.page)
    }

    public async updateEspacoFisico(id: unknown, espacoFisico: EspacoFisicoInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<EspacoFisicoInput>(espacoFisicoSchema, espacoFisico);

        await this.getEspacoFisico(idValidado);
        await this.validarFkInstituicao(atualizacao.idInstituicao);

        await this.repository.updateEspacoFisico(idValidado, atualizacao)
    }

    public async updateEspacoFisicoParcial(id: unknown, espacoFisico: EspacoFisicoOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<EspacoFisicoOptional>(espacoFisicoSchema, espacoFisico, true);

        await this.getEspacoFisico(idValidado);
        await this.validarFkInstituicao(atualizacao.idInstituicao);

        await this.repository.updateEspacoFisico(idValidado, atualizacao)
    }

    public async deleteEspacoFisico(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getEspacoFisico(idValidado);
        
        await this.repository.deleteEspacoFisico(idValidado)
    }

    private async validarFkInstituicao(idInstituicao: number | undefined): Promise<void> {
        const instutuicao = await this.instituicaoRepository.getInstituicao(idInstituicao as number);

        if (!instutuicao) throw new HttpError(404, 'Instituição não encontrada')
    }
}
