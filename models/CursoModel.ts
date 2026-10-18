import type {Status} from './TiposAuxiliares.ts'

export interface Curso {
    id: number,
    nome: string,
    descricao: string,
    cargaHoraria: number,
    quantidadeDeSemestres: number,
    idInstituicao: number,
    idEspacoFisico: number,
    status: Status
}

export type CursoInput = Omit<Curso, 'id' | 'status'> & Partial<Pick<Curso, 'status'>>
export type CursoOptional = Partial<CursoInput>
