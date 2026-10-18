import type {SituacaoMatricula} from './TiposAuxiliares.ts'

export interface Matricula {
    id: number,
    idAluno: number,
    idCurso: number,
    dataMatricula: Date,
    situacaoMatricula: SituacaoMatricula
}

export type MatriculaInput = Omit<Matricula, 'id' | 'dataMatricula' | 'situacaoMatricula'>
    & Partial<Pick<Matricula, 'dataMatricula' | 'situacaoMatricula'>>
export type MatriculaOptional = Partial<MatriculaInput>
