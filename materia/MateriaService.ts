import type { Materia, MateriaInput, MateriaOptional } from '../models/MateriaModel.ts'
import { HttpError, validarInput, validarId, validarPaginacao } from '../helper/helperFunctions.ts'
import { materiaSchema } from '../schemas/MateriaSchema.ts'
import { CursoRepository } from '../curso/CursoRepository.ts'
import { MateriaRepository } from './MateriaRepository.ts'

export class MateriaService {
    constructor(
        private readonly repository: MateriaRepository,
        private readonly cursoRepository: CursoRepository,
    ) {}

    public async createMateria(materia: MateriaInput): Promise<Materia> {
        const validado = validarInput<MateriaInput>(materiaSchema, materia);

        await this.validarFkMateria(validado);

        return this.repository.createMateria(validado)
    }

    public async getMateria(id: unknown): Promise<Materia> {
        const materia = await this.repository.getMateria(validarId(id));

        if (!materia) throw new HttpError(404, 'Matéria não encontrada')

        return materia
    }

    public async listMaterias(offset?: unknown, limit?: unknown): Promise<Materia[]> {
        const paginacao = validarPaginacao(offset, limit);

        return this.repository.listMaterias(paginacao.offset, paginacao.limit)
    }

    public async updateMateria(id: unknown, materia: MateriaInput): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<MateriaInput>(materiaSchema, materia);

        await this.getMateria(idValidado);
        await this.validarFkMateria(atualizacao);

        if (atualizacao.idMateriaPreRequisito === idValidado) {
            throw new HttpError(400, 'Uma matéria não pode ser pré-requisito dela mesma')
        }

        await this.repository.updateMateria(idValidado, atualizacao)
    }

    public async updateMateriaParcial(id: unknown, materia: MateriaOptional): Promise<void> {
        const idValidado = validarId(id);
        const atualizacao = validarInput<MateriaOptional>(materiaSchema, materia, true);

        await this.getMateria(idValidado);
        await this.validarFkMateria(atualizacao);

        if (atualizacao.idMateriaPreRequisito === idValidado) {
            throw new HttpError(400, 'Uma matéria não pode ser pré-requisito dela mesma')
        }

        await this.repository.updateMateria(idValidado, atualizacao)
    }

    public async deleteMateria(id: unknown): Promise<void> {
        const idValidado = validarId(id);

        await this.getMateria(idValidado);

        await this.repository.deleteMateria(idValidado)
    }

    private async validarFkMateria(dados: MateriaOptional): Promise<void> {
        const curso = await this.cursoRepository.getCurso(dados.idCurso as number);

        if (!curso) throw new HttpError(404, 'Curso não encontrado')

        if (typeof dados.idMateriaPreRequisito === 'number') {
            const materiaPreRequisito = await this.repository.getMateria(dados.idMateriaPreRequisito);

            if (!materiaPreRequisito) throw new HttpError(404, 'Matéria pré-requisito não encontrada')
        }
    }
}
