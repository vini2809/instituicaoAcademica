import express from 'express'

import {MatriculaController} from './MatriculaController.ts'
import { MatriculaRepository } from './MatriculaRepository.ts';
import { MatriculaService } from './MatriculaService.ts';
import { AlunoRepository } from '../aluno/AlunoRepository.ts';
import { CursoRepository } from '../curso/CursoRepository.ts';

const matriculaRepository = new MatriculaRepository;
const matriculaService = new MatriculaService(matriculaRepository, new AlunoRepository(), new CursoRepository())
const matriculaController = new MatriculaController(matriculaService);

export const matriculaRoutes = express.Router();

matriculaRoutes.post('/', matriculaController.postMatricula.bind(matriculaController));
matriculaRoutes.get('/', matriculaController.listMatricula.bind(matriculaController));
matriculaRoutes.get('/:id', matriculaController.getMatricula.bind(matriculaController));
matriculaRoutes.patch('/:id', matriculaController.patchMatricula.bind(matriculaController));
matriculaRoutes.put('/:id', matriculaController.putMatricula.bind(matriculaController));
matriculaRoutes.delete('/:id', matriculaController.deleteMatricula.bind(matriculaController));
