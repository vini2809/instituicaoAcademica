import express from 'express'

import {MateriaController} from './MateriaController.ts'
import { MateriaRepository } from './MateriaRepository.ts';
import { MateriaService } from './MateriaService.ts';
import { CursoRepository } from '../curso/CursoRepository.ts';

const materiaRepository = new MateriaRepository;
const materiaService = new MateriaService(materiaRepository, new CursoRepository())
const materiaController = new MateriaController(materiaService);

export const materiaRoutes = express.Router();

materiaRoutes.post('/', materiaController.postMateria.bind(materiaController));
materiaRoutes.get('/', materiaController.listMateria.bind(materiaController));
materiaRoutes.get('/:id', materiaController.getMateria.bind(materiaController));
materiaRoutes.patch('/:id', materiaController.patchMateria.bind(materiaController));
materiaRoutes.put('/:id', materiaController.putMateria.bind(materiaController));
materiaRoutes.delete('/:id', materiaController.deleteMateria.bind(materiaController));
