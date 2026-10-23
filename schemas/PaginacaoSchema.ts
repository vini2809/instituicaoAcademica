import Joi from 'joi'

export const paginacaoSchema = Joi.object({
    limit: Joi.number().integer().min(0).max(100).default(20),
    page: Joi.number().integer().min(1).default(1),
})
