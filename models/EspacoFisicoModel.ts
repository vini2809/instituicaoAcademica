export interface EspacoFisico {
    id: number,
    nome: string,
    endereco: string,
    idInstituicao: number
}

export type EspacoFisicoInput = Omit<EspacoFisico, 'id'>
export type EspacoFisicoOptional = Partial<EspacoFisicoInput>
