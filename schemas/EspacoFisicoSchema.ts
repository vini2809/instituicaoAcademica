import Joi from 'joi'

export const espacoFisicoSchema = Joi.object({
    nome: Joi.string().min(10).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 10 caracteres',
        'string.max': 'Nome deve ter no máximo 100 caracteres',
        'any.required': 'Nome é obrigatório',
    }),
    endereco: Joi.string().max(200).messages({
        'string.base': 'Endereço deve ser uma string',
        'string.max': 'Endereço deve ter no máximo 200 caracteres',
        'any.required': 'Endereço é obrigatório',
    }),
    idInstituicao: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idInstituicao deve ser um número inteiro positivo',
        'number.integer': 'idInstituicao deve ser um número inteiro positivo',
        'number.min': 'idInstituicao deve ser um número inteiro positivo',
        'any.required': 'idInstituicao é obrigatória',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
