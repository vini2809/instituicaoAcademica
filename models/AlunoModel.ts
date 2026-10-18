import type {Status} from './TiposAuxiliares.ts'

export interface Aluno {
    id: number;
    nome: string,
    cpf: string,
    dataDeNascimento: Date,
    status: Status
}

export type AlunoInput = Omit<Aluno, 'id' | 'status'> & Partial<Pick<Aluno, 'status'>>
export type AlunoOptional = Partial<AlunoInput>
