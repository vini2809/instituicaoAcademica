import type { Obrigatoriedade, Status } from "./TiposAuxiliares.ts";

export interface Materia {
    id: number,
    nome: string,
    descricao: string,
    cargaHoraria: number,
    obrigatoriedade: Obrigatoriedade,
    idCurso: number,
    idMateriaPreRequisito: number | null,
    status: Status
}

export type MateriaInput = Omit<Materia, 'id' | 'idMateriaPreRequisito' | 'status'>
    & Partial<Pick<Materia, 'idMateriaPreRequisito' | 'status'>>
export type MateriaOptional = Partial<MateriaInput>
