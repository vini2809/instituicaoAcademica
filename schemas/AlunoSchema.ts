import Joi from 'joi'

import {cpfValido, maioridade} from '../helper/helperFunctions.ts'

export const alunoSchema = Joi.object({
    nome: Joi.string().min(2).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 2 caracteres',
        'string.max': 'Nome deve ter no máximo 100 caracteres',
        'any.required': 'Nome é obrigatório',
    }),
    cpf: Joi.string().length(11).custom((value: any, helpers: any) => {
        if (!cpfValido(value)) {
            return helpers.error('custom.cpf')
        }
        return value}
        , 'validação de CPF')
    .messages({
        'string.base': 'CPF deve ser uma string',
        'string.length': "CPF deve conter 11 caracteres",
        'custom.cpf': 'CPF deve ser válido',
        'any.required': 'CPF é obrigatório',
    }),
    dataDeNascimento: Joi.date().iso().custom((value: any, helpers: any) => {
        if (!maioridade(value)) {
            return helpers.error('custom.maioridade');
        }
        return value}
        , 'verificação de maioridade')
    .messages({
        'date.base': 'Data deve ser válida',
        'date.format': 'Data deve ter formato válido',
        'custom.maioridade': 'Data deve ter mais que 18 anos',
        'any.required': 'Data é obrigatório',

    }),
    status: Joi.string().optional().valid('ativo', 'inativo').default('ativo').messages({
        'string.base': 'Status deve ser uma string',
        'any.required': 'status é obrigatório',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});



