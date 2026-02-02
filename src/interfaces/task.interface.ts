export interface Task {
  id?: number
  name: string
  done: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateTask {
  name: string
  done?: boolean
}

export interface UpdateTask {
  name: string
}
