import express from 'express'
import * as authController from './authController.ts'

export const authRoutes = express.Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)