import type { Instituicao, InstituicaoInput, InstituicaoOptional } from '../models/InstituicaoModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { instituicaoSchema } from '../schemas/InstituicaoSchema.ts'
import { InstituicaoRepository } from './InstituicaoRepository.ts'

export class InstituicaoService {
    constructor(private instituicaoRepository: InstituicaoRepository) {}

    public async createInstituicao(instituicao: InstituicaoInput): Promise<Instituicao> {
        const validada = validarInput<InstituicaoInput>(instituicaoSchema, instituicao);

        if (await this.instituicaoRepository.getByCnpj(validada.cnpj)) {
            throw new HttpError(409, 'Instituição com esse CNPJ já cadastrada')
        }

        return this.instituicaoRepository.createInstituicao(validada)
    }

    public async getInstituicao(id: unknown): Promise<Instituicao> {
        const instituicao = await this.instituicaoRepository.getInstituicao(validarId(id));

        if (!instituicao) throw new HttpError(404, 'Instituição não encontrada')

        return instituicao
    }

    public async listInstituicoes(limit?: unknown, page?: unknown): Promise<Instituicao[]> {
        const paginacao = validarPaginacao(limit, page);

        return this.instituicaoRepository.listInstituicoes(paginacao.limit, paginacao.page)
    }

    public async updateInstituicao(id: unknown, instituicao: InstituicaoInput): Promise<void> {
        const idValidado = validarId(id);
        const validada = validarInput<InstituicaoInput>(instituicaoSchema, instituicao);

        await this.getInstituicao(idValidado);

        const cnpjExistente = await this.instituicaoRepository.getByCnpj(validada.cnpj)
        if (cnpjExistente && cnpjExistente.id !== idValidado) {
            throw new HttpError(409, 'Instituição com esse CNPJ já cadastrada')
        }

        await this.instituicaoRepository.updateInstituicao(idValidado, validada)
    }

    public async updateInstituicaoParcial(id: unknown, instituicao: InstituicaoOptional): Promise<void> {
        const idValidado = validarId(id);
        const validada = validarInput<InstituicaoOptional>(instituicaoSchema, instituicao, true);

        await this.getInstituicao(idValidado);

        if (validada.cnpj) {

            const cnpjExistente = await this.instituicaoRepository.getByCnpj(validada.cnpj)
            if (cnpjExistente && cnpjExistente.id !== idValidado) {
                throw new HttpError(409, 'Instituição com esse CNPJ já cadastrada')
            }
        }

        await this.instituicaoRepository.updateInstituicao(idValidado, validada)
    }

    public async deleteInstituicao(id: unknown): Promise<void> {
        const idValidado = validarId(id);
        
        await this.getInstituicao(idValidado);

        await this.instituicaoRepository.deleteInstituicao(idValidado)
    }
}
