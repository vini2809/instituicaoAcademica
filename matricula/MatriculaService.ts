import type { Matricula, MatriculaInput, MatriculaOptional } from '../models/MatriculaModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { matriculaSchema } from '../schemas/MatriculaSchema.ts'
import { AlunoRepository } from '../aluno/AlunoRepository.ts'
import { CursoRepository } from '../curso/CursoRepository.ts'
import { MatriculaRepository } from './MatriculaRepository.ts'

export class MatriculaService {
    constructor(
        private readonly repository: MatriculaRepository,
        private readonly alunoRepository: AlunoRepository,
        private readonly cursoRepository: CursoRepository,
    ) {}

    public async createMatricula(matricula: MatriculaInput): Promise<Matricula> {
        const validado = validarInput<MatriculaInput>(matriculaSchema, matricula);

        await this.validarFkMatricula(validado);

        return this.repository.createMatricula(validado)
    }

    public async getMatricula(id: unknown): Promise<Matricula> {
        const matricula = await this.repository.getMatricula(validarId(id));

        if (!matricula) throw new HttpError(404, 'Matrícula não encontrada')

        return matricula
    }

    public async listMatriculas(offset?: unknown, limit?: unknown): Promise<Matricula[]> {
        const paginacao = validarPaginacao(offset, limit);

        return this.repository.listMatriculas(paginacao.offset, paginacao.limit)
    }

    public async updateMatricula(id: unknown, matricula: MatriculaInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<MatriculaInput>(matriculaSchema, matricula);

        await this.getMatricula(idValidado);
        await this.validarFkMatricula(atualizacao);

        await this.repository.updateMatricula(idValidado, atualizacao)
    }

    public async updateMatriculaParcial(id: unknown, matricula: MatriculaOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<MatriculaOptional>(matriculaSchema, matricula, true);

        await this.getMatricula(idValidado);
        await this.validarFkMatricula(atualizacao);

        await this.repository.updateMatricula(idValidado, atualizacao)
    }

    public async deleteMatricula(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getMatricula(idValidado);
        
        await this.repository.deleteMatricula(idValidado)
    }

    private async validarFkMatricula(dados: MatriculaOptional): Promise<void> {
        const aluno = await this.alunoRepository.getById(dados.idAluno as number);
        const curso = await this.cursoRepository.getCurso(dados.idCurso as number);

        if (!aluno) throw new HttpError(404, 'Aluno não encontrado')
        if (!curso) throw new HttpError(404, 'Curso não encontrado')
    }
}
