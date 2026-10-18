import Joi from 'joi'

export const materiaSchema = Joi.object({
    nome: Joi.string().min(2).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 2 caracteres',
        'string.max': 'Nome deve ter no máximo 100 caracteres',
        'any.required': 'Nome é obrigatório',
    }),
    descricao: Joi.string().min(10).max(200).messages({
        'string.base': 'Descrição deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 10 caracteres',
        'string.max': 'Descrição deve ter no máximo 200 caracteres',
        'any.required': 'Descrição é obrigatória',
    }),
    cargaHoraria: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'Carga horária deve ser um número inteiro positivo',
        'number.integer': 'Carga horária deve ser um número número inteiro positivo',
        'number.min': 'Carga horária deve ser um número número inteiro positivo',
        'any.required': 'Carga horária é obrigatória',
    }),
    obrigatoriedade: Joi.string().valid('obrigatorio', 'optativa').messages({
        'string.base': 'Obrigatoriedade deve ser uma string',
        'any.valid': "Obrigatoriedade deve ser 'obrigatorio' ou 'optativa'",
        'any.required': 'Obrigatoriedade é obrigatória',
    }),
    idCurso: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idCurso deve ser um número inteiro positivo',
        'number.integer': 'idCurso deve ser um número inteiro positivo',
        'number.min': 'idCurso deve ser um número número inteiro positivo',
        'any.required': 'idCurso é obrigatório',
    }),
    idMateriaPreRequisito: Joi.number().integer().min(1).max(2147483647).allow(null).optional().messages({
        'number.base': 'idMateriaPreRequisito deve ser um número inteiro positivo',
        'number.integer': 'idMateriaPreRequisito deve ser um número inteiro positivo',
        'number.min': 'idMateriaPreRequisito deve ser um número número inteiro positivo',
        'any.required': 'idMateriaPreRequisito é obrigatório',
    }),
    status: Joi.string().optional().valid('ativo', 'inativo').default('ativo').messages({
        'string.base': 'Status deve ser uma string',
        'any.required': 'status é obrigatório',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
