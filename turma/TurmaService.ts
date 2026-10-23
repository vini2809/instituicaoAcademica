import type { Turma, TurmaInput, TurmaOptional } from '../models/TurmaModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { turmaSchema } from '../schemas/TurmaSchema.ts'
import { MateriaRepository } from '../materia/MateriaRepository.ts'
import { ProfessorRepository } from '../professor/ProfessorRepository.ts'
import { TurmaRepository } from './TurmaRepository.ts'

export class TurmaService {
    constructor(
        private repository: TurmaRepository,
        private professorRepository: ProfessorRepository,
        private materiaRepository: MateriaRepository,
    ) {}


    public async createTurma(turma: TurmaInput): Promise<Turma> {
        const validado = validarInput<TurmaInput>(turmaSchema, turma);
    
        await this.validarFkTurma(validado)

        return this.repository.createTurma(validado)
    }

    public async getTurma(id: unknown): Promise<Turma> {
        const turma = await this.repository.getTurma(validarId(id));

        if (!turma) throw new HttpError(404, 'Turma não encontrada')

        return turma
    }

    public async listTurmas(limit?: unknown, page?: unknown): Promise<Turma[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.repository.listTurmas(paginacao.limit, paginacao.page)
    }

    public async updateTurma(id: unknown, turma: TurmaInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<TurmaInput>(turmaSchema, turma);
        
        await this.getTurma(idValidado);
        await this.validarFkTurma(atualizacao);

        await this.repository.updateTurma(idValidado, atualizacao)
    }

    public async updateTurmaParcial(id: unknown, turma: TurmaOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<TurmaOptional>(turmaSchema, turma, true);

        const turmaExistente = await this.getTurma(idValidado);
        await this.validarFkTurma(atualizacao);

        await this.repository.updateTurma(idValidado, atualizacao)
    }

    public async deleteTurma(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getTurma(idValidado);
        
        await this.repository.deleteTurma(idValidado)
    }

    private async validarFkTurma(dados: TurmaOptional): Promise<void> {
        const professor = await this.professorRepository.getProfessor(dados.idProfessor as number);
        const materia = await this.materiaRepository.getMateria(dados.idMateria as number);

        if (!professor) throw new HttpError(404, 'Professor não encontrado')
        if (!materia) throw new HttpError(404, 'Matéria não encontrada')
    }
}
