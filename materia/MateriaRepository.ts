import { database } from '../database/database.ts'
import type { Materia, MateriaInput, MateriaOptional } from '../models/MateriaModel.ts'

export class MateriaRepository {
    public async createMateria(materia: MateriaInput): Promise<Materia> {
        const [novaMateria] = await database<Materia>('materia')
            .insert(materia)
            .returning('*')
            
        return novaMateria
    }

    public async getMateria(id: number): Promise<Materia | undefined> {
        return database<Materia>('materia')
            .select('*')
            .where({ id })
            .first()
    }

    public async listMaterias(limit: number, page: number): Promise<Materia[]> {
        const offset = limit * (page - 1)
        
        return database<Materia>('materia')
            .select('*')
            .orderBy('id')
            .offset(offset)
            .limit(limit)
    }

    public async updateMateria(id: number, materia: MateriaOptional): Promise<void> {
        await database<Materia>('materia')
            .update(materia)
            .where({ id })
    }

    public async deleteMateria(id: number): Promise<void> {
        await database<Materia>('materia')
            .delete()
            .where({ id })
    }
}
