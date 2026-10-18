import Joi from 'joi'

export const turmaSchema = Joi.object({
    idProfessor: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idProfessor deve ser um número inteiro positivo',
        'number.integer': 'idProfessor deve ser um número inteiro positivo',
        'number.min': 'idProfessor deve ser um número número inteiro positivo',
        'any.required': 'idProfessor é obrigatório'
        }),
    idMateria: Joi.number().integer().min(1).max(2147483647).messages({
        'number.base': 'idMateria deve ser um número inteiro positivo',
        'number.integer': 'idMateria deve ser um número inteiro positivo',
        'number.min': 'idMateria deve ser um número número inteiro positivo',
        'any.required': 'idMateria é obrigatório'
        }),
    semestre: Joi.string().pattern(/^\d{4}-[1-2]$/).messages({
        'string.base': 'Semestre deve ser uma string',
        'string.pattern.base': 'Semestre deve estar no formato AAAA-S (por exemplo, 2026-1)',
        'any.required': 'Semestre é obrigatório',
        }),
    diaDaSemana: Joi.string()
        .valid('segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo').messages({
        'string.base': 'Dia da Semana deve ser uma string',
        'string.valid': 'Dia da Semana deve um dia válido',
        'any.required': 'Dia da Semana é obrigatório',
        }),
    horaInicio: Joi.string().pattern(/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?$/).messages({
        'string.base': 'Horário inicial deve ser uma string',
        'string.pattern': 'Horário inicial deve ser válido',
        'any.required': 'Horário inicial é obrigatório',
    }),
    horaFim: Joi.string().pattern(/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,6})?)?$/).messages({
        'string.base': 'Horário final deve ser uma string',
        'string.pattern': 'Horário final deve ser válido',
        'any.required': 'Horário final é obrigatório',
    }),
    status: Joi.string().optional().valid('ativo', 'inativo').default('ativo').messages({
        'string.base': 'Status deve ser uma string',
        'any.required': 'status é obrigatório',
    })
}).unknown(false).messages({
    'object.unknown': 'O campo "{#label}" não é permitido.'
});
