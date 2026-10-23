import type { Professor, ProfessorInput, ProfessorOptional } from '../models/ProfessorModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao, cpfValido } from '../helper/helperFunctions.ts'
import { professorSchema } from '../schemas/ProfessorSchema.ts'
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts'
import { ProfessorRepository } from './ProfessorRepository.ts'

export class ProfessorService {
    constructor(
        private professorRepository: ProfessorRepository,
        private instituicaoRepository: InstituicaoRepository,
    ) {}

    public async createProfessor(professor: ProfessorInput): Promise<Professor> {
        const validado = validarInput<ProfessorInput>(professorSchema, professor);

        await this.validarPkProfessor(validado)
        if (await this.professorRepository.getByCpf(validado.cpf)) {
            throw new HttpError(409, 'Professor com esse CPF já cadastrado')
        }

        return this.professorRepository.createProfessor(validado)
    }

    public async getProfessor(id: unknown): Promise<Professor> {
        const professor = await this.professorRepository.getProfessor(validarId(id));

        if (!professor) throw new HttpError(404, 'Professor não encontrado')

        return professor
    }

    public async listProfessores(limit?: unknown, page?: unknown): Promise<Professor[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.professorRepository.listProfessores(paginacao.limit, paginacao.page)
    }

    public async updateProfessor(id: unknown, professor: ProfessorInput): Promise<void> {
        const idValidado = validarId(id);
        const validado = validarInput<ProfessorInput>(professorSchema, professor);

        await this.getProfessor(idValidado)
        await this.validarPkProfessor(validado)
        if (await this.professorRepository.getByCpf(validado.cpf)) {
            throw new HttpError(409, 'Professor com esse CPF já cadastrado')
        }
        
        await this.professorRepository.updateProfessor(idValidado, validado)
    }

    public async updateProfessorParcial(id: unknown, professor: ProfessorOptional): Promise<void> {
        const idValidado = validarId(id)
        const validado = validarInput<ProfessorOptional>(professorSchema, professor, true);

        await this.getProfessor(idValidado)
        if (validado.idInstituicao) {
            await this.validarPkProfessor(validado)
        }
        if (validado.cpf) {
            if (await this.professorRepository.getByCpf(validado.cpf)) {
                throw new HttpError(409, 'Professor com esse CPF já cadastrado')
            }
        }
        
        await this.professorRepository.updateProfessor(idValidado, validado)
    }

    public async deleteProfessor(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getProfessor(idValidado);

        await this.professorRepository.deleteProfessor(idValidado)
    }

    private async validarPkProfessor(dados: ProfessorOptional): Promise<void> {
        const instituicao = await this.instituicaoRepository.getInstituicao(dados.idInstituicao as number);

        if (!instituicao) throw new HttpError(404, 'Instituição não encontrada')
    }
}
