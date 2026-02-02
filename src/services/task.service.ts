import api from '@/api/axios'
import type { Task, CreateTask } from '@/interfaces/task.interface'

export const AutheService={
  async create(payload: CreateTask) {
    const { data } = await api.post('/tasks', payload)
    return data
  },

  async getAll() {
    const { data } = await api.get('/tasks')
    return data
  },

  async getById(id: number): Promise<Task> {
    const { data } = await api.get<Task>(`/tasks/${id}`)
    return data
  },

  async update(id: number, payload: Partial<CreateTask>) {
    const { data } = await api.put(`/tasks/${id}`, payload)
    return data
  },

   async updateNone(id: number, payload: Partial<CreateTask>): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}`, payload)
    return data
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`)
  },
}
