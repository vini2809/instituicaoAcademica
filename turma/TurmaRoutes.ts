import express from 'express'

import {TurmaController} from './TurmaController.ts'
import { TurmaRepository } from './TurmaRepository.ts';
import { TurmaService } from './TurmaService.ts';
import { ProfessorRepository } from '../professor/ProfessorRepository.ts';
import { MateriaRepository } from '../materia/MateriaRepository.ts';

const turmaRepository = new TurmaRepository;
const turmaService = new TurmaService(turmaRepository, new ProfessorRepository(), new MateriaRepository())
const turmaController = new TurmaController(turmaService);

export const turmaRoutes = express.Router();

turmaRoutes.post('/', turmaController.postTurma.bind(turmaController));
turmaRoutes.get('/', turmaController.listTurma.bind(turmaController));
turmaRoutes.get('/:id', turmaController.getTurma.bind(turmaController));
turmaRoutes.patch('/:id', turmaController.patchTurma.bind(turmaController));
turmaRoutes.put('/:id', turmaController.putTurma.bind(turmaController));
turmaRoutes.delete('/:id', turmaController.deleteTurma.bind(turmaController));
