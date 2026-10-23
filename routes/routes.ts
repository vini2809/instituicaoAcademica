import express from 'express';

import { alunoRoutes } from '../aluno/AlunoRoutes.ts'
import { authRoutes } from '../auth/authRoutes.ts'
import { avaliacaoRoutes } from '../avaliacao/AvaliacaoRoutes.ts';
import { cursoRoutes } from '../curso/CursoRoutes.ts';
import { espacoFisicoRoutes } from '../espaco_fisico/EspacoFisicoRoutes.ts';
import { instituicaoRoutes } from '../instituicao/InstituicaoRoutes.ts';
import { materiaRoutes } from '../materia/MateriaRoutes.ts';
import { matriculaRoutes } from '../matricula/MatriculaRoutes.ts';
import { professorRoutes } from '../professor/ProfessorRoutes.ts';
import { turmaRoutes } from '../turma/TurmaRoutes.ts';
import { usuarioRoutes } from '../usuario/UsuarioRoutes.ts';
import { authMiddleware } from '../middleware/authMiddleware.ts'
import { permissionMiddleware } from '../middleware/permissionMiddleware.ts'

export const routes = express.Router();

// /auth é a única rota sem middlewares de autenticação ou permissão
routes.use('/auth', authRoutes);

// adicionando os middlewares de autenticação e permissão a todas as outras rotas
routes.use(authMiddleware);
routes.use(permissionMiddleware);

routes.use('/usuarios', usuarioRoutes);
routes.use('/alunos', alunoRoutes);
routes.use('/avaliacoes', avaliacaoRoutes);
routes.use('/cursos', cursoRoutes);
routes.use('/espacos_fisicos', espacoFisicoRoutes);
routes.use('/instituicoes', instituicaoRoutes);
routes.use('/materias', materiaRoutes);
routes.use('/matriculas', matriculaRoutes);
routes.use('/professores', professorRoutes);
routes.use('/turmas', turmaRoutes);
routes.use('/usuarios', usuarioRoutes);