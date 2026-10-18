import type { DiaDaSemana, Status } from "./TiposAuxiliares.ts";

export interface Turma {
    id: number,
    idProfessor: number,
    idMateria: number,
    semestre: string,
    diaDaSemana: DiaDaSemana,
    horaInicio: string,
    horaFim: string,
    status: Status,
}

export type TurmaInput = Omit<Turma, 'id' | 'status'> & Partial<Pick<Turma, 'status'>>
export type TurmaOptional = Partial<TurmaInput>
