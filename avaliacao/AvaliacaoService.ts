import type { Avaliacao, AvaliacaoInput, AvaliacaoOptional } from '../models/AvaliacaoModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { avaliacaoSchema } from '../schemas/AvaliacaoSchema.ts'
import { AlunoRepository } from '../aluno/AlunoRepository.ts'
import { TurmaRepository } from '../turma/TurmaRepository.ts'
import { AvaliacaoRepository } from './AvaliacaoRepository.ts'

export class AvaliacaoService {
    constructor(
        private readonly repository: AvaliacaoRepository,
        private readonly alunoRepository: AlunoRepository,
        private readonly turmaRepository: TurmaRepository,
    ) {}

    public async createAvaliacao(avaliacao: AvaliacaoInput): Promise<Avaliacao> {
        const avaliacaoValidada = validarInput<AvaliacaoInput>(avaliacaoSchema, avaliacao)
        await this.validarFkAvaliacao(avaliacaoValidada)

        return this.repository.createAvaliacao(avaliacaoValidada)
    }

    public async getAvaliacao(id: unknown): Promise<Avaliacao> {
        const idValidado = validarId(id);
        const avaliacao = await this.repository.getAvaliacao(idValidado);

        if (!avaliacao) throw new HttpError(404, 'Avaliação não encontrada');

        return avaliacao
    }

    public async listAvaliacoes(offset?: unknown, limit?: unknown): Promise<Avaliacao[]> {
        const paginacao = validarPaginacao(offset, limit);

        return this.repository.listAvaliacoes(paginacao.offset, paginacao.limit)
    }

    public async updateAvaliacao(id: unknown, avaliacao: AvaliacaoInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<AvaliacaoInput>(avaliacaoSchema, avaliacao);

        await this.getAvaliacao(idValidado);
        await this.validarFkAvaliacao(atualizacao);

        await this.repository.updateAvaliacao(idValidado, atualizacao)
    }

    public async updateAvaliacaoParcial(id: unknown, avaliacao: AvaliacaoOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<AvaliacaoOptional>(avaliacaoSchema, avaliacao, true);
        
        await this.getAvaliacao(idValidado)
        await this.validarFkAvaliacao(atualizacao)

        await this.repository.updateAvaliacao(idValidado, atualizacao)
    }

    public async deleteAvaliacao(id: unknown): Promise<void> {
        const idValidado = validarId(id)
        await this.getAvaliacao(idValidado)

        await this.repository.deleteAvaliacao(idValidado)
    }

    private async validarFkAvaliacao(dados: AvaliacaoOptional): Promise<void> {
        const aluno = await this.alunoRepository.getById(dados.idAluno as number);
        const turma = await this.turmaRepository.getTurma(dados.idTurma as number);

        if (!aluno) throw new HttpError(404, 'Aluno não encontrado')
        if (!turma) throw new HttpError(404, 'Turma não encontrada')
    }
}
