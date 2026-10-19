export type Status = 'ativo' | 'inativo';
export type Permissao = 'aluno' | 'professor' | 'administrador';
export type SituacaoMatricula = 'finalizada' | 'em curso' | 'trancada' | 'desistente';
export type Obrigatoriedade = 'obrigatorio' | 'optativa';
export type DiaDaSemana = 'segunda-feira' | 'terça-feira' | 'quarta-feira' | 'quinta-feira' | 'sexta-feira' | 'sábado' | 'domingo';

export interface Paginacao {
    offset: number;
    limit: number;
}