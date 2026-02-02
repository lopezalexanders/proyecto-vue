import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task, CreateTask } from '@/interfaces/task.interface'
//import TaskService from '@/services/task.service'
/*
export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
      const data = await TaskService.getAll()
      tasks.value = data || []
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Error al cargar tareas'
      }
    } finally {
      loading.value = false
    }
  }

  async function createTask(payload: CreateTask) {
    loading.value = true
    try {
      const t = await TaskService.create(payload)
      tasks.value.unshift(t)
      return t
    } finally {
      loading.value = false
    }
  }

  async function updateTask(id: number, payload: Partial<CreateTask>) {
    loading.value = true
    try {
      const t = await TaskService.update(id, payload)
      const idx = tasks.value.findIndex((x) => x.id === t.id)
      if (idx >= 0) tasks.value[idx] = t
      return t
    } finally {
      loading.value = false
    }
  }

  async function deleteTask(id: number) {
    loading.value = true
    try {
      await TaskService.remove(id)
      tasks.value = tasks.value.filter((t) => t.id !== id)
    } finally {
      loading.value = false
    }
  }

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }
})
*/
