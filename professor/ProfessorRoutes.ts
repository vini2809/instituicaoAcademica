import express from 'express'

import {ProfessorController} from './ProfessorController.ts'
import { ProfessorRepository } from './ProfessorRepository.ts';
import { ProfessorService } from './ProfessorService.ts';
import { InstituicaoRepository } from '../instituicao/InstituicaoRepository.ts';

const professorRepository = new ProfessorRepository;
const professorService = new ProfessorService(professorRepository, new InstituicaoRepository)
const professorController = new ProfessorController(professorService);

export const professorRoutes = express.Router();

professorRoutes.post('/', professorController.postProfessor.bind(professorController));
professorRoutes.get('/', professorController.listProfessor.bind(professorController));
professorRoutes.get('/:id', professorController.getProfessor.bind(professorController));
professorRoutes.patch('/:id', professorController.patchProfessor.bind(professorController));
professorRoutes.put('/:id', professorController.putProfessor.bind(professorController));
professorRoutes.delete('/:id', professorController.deleteProfessor.bind(professorController));
