import Joi from 'joi'

export const avaliacaoSchema = Joi.object({
    idAluno: Joi.number().integer().min(1).messages({
        'number.base': 'IdAluno deve ser um número inteiro positivo',
        'number.integer': 'IdAluno deve ser um número inteiro positivo',
        'number.min': 'IdAluno deve ser um número inteiro positivo',
        'any.required': 'IdAluno é obrigatório',
    }),
    idTurma: Joi.number().integer().min(1).messages({
        'number.base': 'idTurma deve ser um número inteiro positivo',
        'number.integer': 'idTurma deve ser um número inteiro positivo',
        'number.min': 'idTurma deve ser um número inteiro positivo',
        'any.required': 'idTurma é obrigatório',
    }),
    nota: Joi.number().min(0).max(10).messages({
        'number.base': 'Nota deve ser um número entre 0 e 10',
        'number.min': 'Nota deve ser um número entre 0 e 10',
        'number.max': 'Nota deve ser um número entre 0 e 10',
        'any.required': 'Nota é obrigatória',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
