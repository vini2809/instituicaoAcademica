import type {Status} from './TiposAuxiliares.ts'

export interface Professor {
    id: number,
    nome: string,
    cpf: string,
    dataDeNascimento: Date,
    idInstituicao: number,
    dataContratacao: Date,
    status: Status
}

export type ProfessorInput = Omit<Professor, 'id' | 'status'> & Partial<Pick<Professor, 'status'>>
export type ProfessorOptional = Partial<ProfessorInput>
