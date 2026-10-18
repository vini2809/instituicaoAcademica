import express from 'express'

import {AlunoController} from './AlunoController.ts'
import { AlunoRepository } from './AlunoRepository.ts';
import { AlunoService } from './AlunoService.ts';

const alunoRepository = new AlunoRepository;
const alunoService = new AlunoService(alunoRepository)
const alunoController = new AlunoController(alunoService);

export const alunoRoutes = express.Router();

alunoRoutes.post('/', alunoController.postAluno.bind(alunoController));
alunoRoutes.get('/', alunoController.listAluno.bind(alunoController));
alunoRoutes.get('/:id', alunoController.getAluno.bind(alunoController));
alunoRoutes.patch('/:id', alunoController.patchAluno.bind(alunoController));
alunoRoutes.put('/:id', alunoController.putAluno.bind(alunoController));
alunoRoutes.delete('/:id', alunoController.deleteAluno.bind(alunoController));