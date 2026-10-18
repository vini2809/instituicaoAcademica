import Joi from 'joi'

export const matriculaSchema = Joi.object({
    idAluno: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idAluno deve ser um número inteiro positivo',
        'number.integer': 'idAluno deve ser um número inteiro positivo',
        'number.min': 'idAluno deve ser um número inteiro positivo',
        'any.required': 'idAluno é obrigatório'
    }),
    idCurso: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idCurso deve ser um número inteiro positivo',
        'number.integer': 'idCurso deve ser um número inteiro positivo',
        'number.min': 'idCurso deve ser um número inteiro positivo',
        'any.required': 'idCurso é obrigatório'
    }),
    dataMatricula: Joi.date().iso().optional().default(() => new Date()).messages({
        'date.base': 'Data deve ser válida',
        'date.format': 'Data deve ter formato válido',
        'any.required': 'Data é obrigatória'
    }),
    situacaoMatricula: Joi.string().optional()
        .valid('finalizada', 'em curso', 'trancada', 'desistente')
        .default('em curso')
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
