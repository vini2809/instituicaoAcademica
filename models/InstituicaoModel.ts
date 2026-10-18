export interface Instituicao {
    id: number,
    nome: string,
    cnpj: string,
    dataDeFundacao: Date
}

export type InstituicaoInput = Omit<Instituicao, 'id'>
export type InstituicaoOptional = Partial<InstituicaoInput>