import Joi from 'joi'

export const cursoSchema = Joi.object({
    nome: Joi.string().min(10).max(100).messages({
        'string.base': 'Nome deve ser uma string',
        'string.min': 'Nome deve ter no mínimo 10 caracteres',
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
    quantidadeDeSemestres: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'Quantidade de semestres deve ser um número inteiro positivo',
        'number.integer': 'Quantidade de semestres deve ser um número inteiro positivo',
        'number.min': 'Quantidade de semestres deve ser um número número inteiro positivo',
        'any.required': 'Quantidade de semestres é obrigatória',
    }),
    idInstituicao: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idInstituicao deve ser um número inteiro positivo',
        'number.integer': 'idInstituicao deve ser um número inteiro positivo',
        'number.min': 'idInstituicao deve ser um número número inteiro positivo',
        'any.required': 'idInstituicao é obrigatória',
    }),
    idEspacoFisico: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idEspacoFisico deve ser um número inteiro positivo',
        'number.integer': 'idEspacoFisico deve ser um número inteiro positivo',
        'number.min': 'idEspacoFisico deve ser um número número inteiro positivo',
        'any.required': 'idEspacoFisico é obrigatória',
    }),
    status: Joi.string().optional().valid('ativo', 'inativo').default('ativo').messages({
        'string.base': 'Status deve ser uma string',
        'any.required': 'Status é obrigatório',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
