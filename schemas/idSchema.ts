import Joi from 'joi'

export const idSchema = Joi.number().integer().min(1).messages({
        'number.base': 'ID deve ser um número inteiro positivo',
        'number.integer': 'ID deve ser um número inteiro positivo',
        'number.min': 'ID deve ser um número inteiro positivo',
        'any.required': 'ID é obrigatório',
})