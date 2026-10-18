import express from 'express'

import {AvaliacaoController} from './AvaliacaoController.ts'
import { AvaliacaoRepository } from './AvaliacaoRepository.ts';
import { AvaliacaoService } from './AvaliacaoService.ts';
import { AlunoRepository } from '../aluno/AlunoRepository.ts';
import { TurmaRepository } from '../turma/TurmaRepository.ts';

const avaliacaoRepository = new AvaliacaoRepository;
const avaliacaoService = new AvaliacaoService(avaliacaoRepository, new AlunoRepository(), new TurmaRepository())
const avaliacaoController = new AvaliacaoController(avaliacaoService);

export const avaliacaoRoutes = express.Router();

avaliacaoRoutes.post('/', avaliacaoController.postAvaliacao.bind(avaliacaoController));
avaliacaoRoutes.get('/', avaliacaoController.listAvaliacao.bind(avaliacaoController));
avaliacaoRoutes.get('/:id', avaliacaoController.getAvaliacao.bind(avaliacaoController));
avaliacaoRoutes.patch('/:id', avaliacaoController.patchAvaliacao.bind(avaliacaoController));
avaliacaoRoutes.put('/:id', avaliacaoController.putAvaliacao.bind(avaliacaoController));
avaliacaoRoutes.delete('/:id', avaliacaoController.deleteAvaliacao.bind(avaliacaoController));
