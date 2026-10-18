import Joi from 'joi'

export const paginacaoSchema = Joi.object({
    offset: Joi.number().integer().min(0).max(2147483647).default(0),
    limit: Joi.number().integer().min(1).max(100).default(20),
}).unknown(false)
