import type { Curso, CursoInput, CursoOptional } from '../models/CursoModel.ts'
import { cursoSchema } from '../schemas/CursoSchema.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { EspacoFisicoRepository } from '../espaco_fisico/EspacoFisicoRepository.ts'
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts'
import { CursoRepository } from './CursoRepository.ts'

export class CursoService {
    constructor(
        private repository: CursoRepository,
        private instituicaoRepository: InstituicaoRepository,
        private espacoFisicoRepository: EspacoFisicoRepository,
    ) {}

    

    public async createCurso(curso: CursoInput): Promise<Curso> {
        const cursoValidado = validarInput<CursoInput>(cursoSchema, curso);

        await this.validarFkCurso(cursoValidado);

        return this.repository.createCurso(cursoValidado);
    }

    public async getCurso(id: unknown): Promise<Curso> {
        const curso = await this.repository.getCurso(validarId(id));

        if (!curso) throw new HttpError(404, 'Curso não encontrado')

        return curso;
    }

    public async listCursos(limit?: unknown, page?: unknown): Promise<Curso[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.repository.listCursos(paginacao.limit, paginacao.page);
    }

    public async updateCurso(id: unknown, curso: CursoInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<CursoInput>(cursoSchema, curso);

        await this.getCurso(idValidado);
        await this.validarFkCurso(atualizacao);

        await this.repository.updateCurso(idValidado, atualizacao)
    }

    public async updateCursoParcial(id: unknown, curso: CursoOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<CursoOptional>(cursoSchema, curso, true);

        await this.getCurso(idValidado);
        await this.validarFkCurso(atualizacao);

        await this.repository.updateCurso(idValidado, atualizacao)
    }

    public async deleteCurso(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getCurso(idValidado);

        await this.repository.deleteCurso(idValidado)
    }

    private async validarFkCurso(dados: CursoOptional): Promise<void> {
        const instituicao = await this.instituicaoRepository.getInstituicao(dados.idInstituicao as number);
        const espacoFisico = await this.espacoFisicoRepository.getEspacoFisico(dados.idEspacoFisico as number);

        if (!instituicao) throw new HttpError(404, 'Instituição não encontrada')
        if (!espacoFisico) throw new HttpError(404, 'Espaço físico não encontrado')
    }
}
