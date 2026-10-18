import Joi from 'joi'

export const usuarioSchema = Joi.object({
    nome: Joi.string().min(2).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 2 caracteres',
        'string.max': 'Nome deve ter no máximo 100 caracteres',
        'any.required': 'Nome é obrigatório',
    }),
    email: Joi.string().trim().lowercase().email().max(100).messages({
        'string.base': 'E-mail deve ser uma string',
        'string.email': 'E-mail deve ser um e-mail válido',
        'string.max': 'E-mail deve ter no máximo 100 caracteres',
        'any.required': 'E-mail é obrigatório',
    }),
    senha: Joi.string().min(8).max(72).messages({
        'string.base': 'Senha deve ser uma string',
        'string.min': 'Senha deve ter no mínimo 8 caracteres',
        'string.max': 'Senha deve ter no máximo 72 caracteres',
        'any.required': 'Senha é obrigatória',
    }),
    permissao: Joi.string().valid('aluno', 'professor', 'administrador').messages({
        'string.base': 'Permissão deve ser uma string',
        'any.only': "Permissão deve ser 'aluno', 'professor' ou 'administrador'",
        'any.required': 'Permissão é obrigatória',
    }),
    status: Joi.string().valid('ativo', 'inativo').optional().default('ativo').messages({
        'string.base': 'Status deve ser uma string',
        'any.required': 'status é obrigatório',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
