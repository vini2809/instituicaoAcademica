import type { Aluno, AlunoInput, AlunoOptional } from '../models/AlunoModel.ts'
import { alunoSchema } from '../schemas/AlunoSchema.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { AlunoRepository } from './AlunoRepository.ts'

export class AlunoService {
    constructor(private readonly alunoRepository: AlunoRepository) {}

    public async createAluno(aluno: AlunoInput): Promise<Aluno> {
        const alunoValidado = validarInput<AlunoInput>(alunoSchema, aluno);

        if (await this.alunoRepository.getByCpf(alunoValidado.cpf)) {
            throw new HttpError(409, 'Aluno com esse CPF já cadastrado')
        }

        return this.alunoRepository.createAluno(alunoValidado)
    }

    public async getAluno(id: unknown): Promise<Aluno> {
        const idValidado = validarId(id);
        const aluno = await this.alunoRepository.getById(idValidado);

        if (!aluno) throw new HttpError(404, 'Aluno não encontrado');

        return aluno;
    }

    public async listAlunos(offset?: unknown, limit?: unknown): Promise<Aluno[]> {
        const paginacao = validarPaginacao(offset, limit);

        return this.alunoRepository.listAlunos(paginacao.offset, paginacao.limit)
    }

    public async updateAluno(id: unknown, aluno: AlunoInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<AlunoInput>(alunoSchema, aluno);

        await this.getAluno(idValidado);

        const cpfExistente = await this.alunoRepository.getByCpf(atualizacao.cpf)

        if (cpfExistente && cpfExistente.id !== idValidado) {
            throw new HttpError(409, 'Aluno com esse CPF já cadastrado')
        }

        await this.alunoRepository.updateAluno(idValidado, atualizacao)
    }

    public async updateAlunoParcial(id: unknown, aluno: AlunoOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<AlunoOptional>(alunoSchema, aluno, true);

        await this.getAluno(idValidado);

        if (atualizacao.cpf) {

            const cpfExistente = await this.alunoRepository.getByCpf(atualizacao.cpf)
            if (cpfExistente && cpfExistente.id !== idValidado) {
                throw new HttpError(409, 'Aluno com esse CPF já cadastrado')
            }
        }

        await this.alunoRepository.updateAluno(idValidado, atualizacao)
    }

    public async deleteAluno(id: unknown): Promise<void> {
        const idValidado = validarId(id);
        await this.getAluno(idValidado);

        await this.alunoRepository.deleteAluno(idValidado);
    }
}
