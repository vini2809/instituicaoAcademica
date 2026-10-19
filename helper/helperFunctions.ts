import moment from 'moment'
import Joi from 'joi'
import type { Response } from 'express'
import type { Paginacao } from '../models/TiposAuxiliares.ts'
import { paginacaoSchema } from '../schemas/PaginacaoSchema.ts'
import { idSchema } from '../schemas/idSchema.ts'

moment().format()

export class HttpError extends Error {
    public readonly status: number

    constructor(status: number, message: string) {
        super(message)
        this.name = 'HttpError'
        this.status = status
    }
}

export function handleError(res: Response, erro: unknown): Response {
    if (erro instanceof HttpError) {
        return res.status(erro.status).json({ error: erro.message })
    }
    console.log(erro)
    return res.status(500).json({ error: 'Erro interno do servidor' })
}

export function validarInput<T>(schema: Joi.ObjectSchema, input: unknown, parcial = false): T {
    if (parcial && (typeof input !== 'object' || input === null || Object.keys(input).length === 0)) {
        throw new HttpError(400, 'Informe ao menos um campo para atualizar')
    }

    const {error, value} = schema.validate(input, {
        presence: parcial ? 'optional' : 'required',
        abortEarly: false,
        allowUnknown: false,
        convert: true,
        noDefaults: parcial,
    })

    if (error) {
        throw new HttpError(400, error.details.map((d) => d.message).join('. '))
    }

    return value as T
}

export function validarId(input: unknown): number {
    const id = Number(input)
    const {error, value} = idSchema.validate(id, { abortEarly: false, convert: true })

    if (error) {
        throw new HttpError(400, error.details.map((d) => d.message).join('. '))
    }

    return value
}

export function validarPaginacao(offset: unknown, limit: unknown): Paginacao {
    const {error, value} = paginacaoSchema.validate(
        { offset: offset ?? 0, limit: limit ?? 20 },
        { abortEarly: false, convert: true },
    )

    if (error) {
        throw new HttpError(400, error.details.map((d) => d.message).join('. '))
    }

    return value as Paginacao
}

export function cpfValido(cpf: any): boolean {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')
  
    if (strCPF.length !== 11)
        return false
    
    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
        ].indexOf(strCPF) !== -1)
    return false

    for (let i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) 
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false

    Soma = 0

    for (let i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11)) {
        Resto = 0
    } 
        

    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false

  return true
}

export function cnpjValido(cnpj: any): boolean {
    var b = [ 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 ]
    var c: any = String(cnpj).replace(/[^\d]/g, '')
    
    if(c.length !== 14)
        return false

    if(/0{14}/.test(c))
        return false

    for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
    if(c[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
    if(c[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false

    return true
}

export function maioridade(data: any): boolean {
    return moment(data) <= moment().subtract(18, 'years')
}