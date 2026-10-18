import Joi from 'joi'

import {cnpjValido} from '../helper/helperFunctions.ts'

export const instituicaoSchema = Joi.object({
    nome: Joi.string().min(10).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 10 caracteres',
        'string.max': 'Nome deve ter no máximo 100 caracteres',
        'any.required': 'Nome é obrigatório',
    }),
    cnpj: Joi.string().length(14).custom((value: any, helpers: any) => {
        if (!cnpjValido(value)) {
            return helpers.error('custom.cnpj')
        }
        return value}
        , 'validação de CNPJ')
    .messages({
        'string.base': 'CNPJ deve ser uma string',
        'string.length': "CNPJ deve conter 14 caracteres",
        'custom.cnpj': 'CNPJ deve ser válido',
        'any.required': 'CNPJ é obrigatório',
    }),
    dataDeFundacao: Joi.date().iso().messages({
        'date.base': 'Data deve ser válida',
        'date.format': 'Data deve ter formato válido',
        'any.required': 'Data é obrigatória',
    }),
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
