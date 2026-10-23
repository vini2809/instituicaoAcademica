import Joi from 'joi'

export const credenciaisSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    senha: Joi.string().required(),
})