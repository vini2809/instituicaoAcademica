export interface Avaliacao {
    id: number,
    idAluno: number,
    idTurma: number,
    nota: number,
}

export type AvaliacaoInput = Omit<Avaliacao, 'id'>
export type AvaliacaoOptional = Partial<AvaliacaoInput>
