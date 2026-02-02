<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { Task } from '@/interfaces/task.interface'
import router from '@/router'
import { useAlert } from '@/composables/useAlert';
import { useRequest } from '@/composables/useRequest';
import { AutheService } from '@/services/task.service'


//const store = useTaskStore()
const newTask = () => {
  console.log('Preparando Nueva tarea');
  router.push({ name: 'taskregister' })
}

const updateTask = (task: Task) => {
  console.log('Preparando Actualización de tarea');
  router.push({ name: 'taskedit', params: { id: task.id } })
}
const editing = ref<Task | null>(null)

const { open } = useAlert()
const { run, error } = useRequest()
const tasks = ref<Task[]>([]);

onMounted(async () => {
  try {
    const data = await run(() => AutheService.getAll())
    tasks.value = data.data
    console.log('lista tareas', tasks.value);
  } catch {
    open(error.value ?? 'Error al cargar tareas', 'error')
  }
})

const store = {
  async deleteTask(id: number) {
    try {
      await run(() => AutheService.remove(id))
      tasks.value = tasks.value.filter(task => task.id !== id)
      open('Tarea eliminada', 'success')
    } catch {
      open(error.value ?? 'Error al eliminar tarea', 'error')
    }
  },
  async updateTask(id: number, updates: Partial<Task>) {
    try {
      const updatedTask = await run(() => AutheService.update(id, updates))
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
      open('Tarea actualizada', 'success')
    } catch {
      open(error.value ?? 'Error al actualizar tarea', 'error')
    }
  }
}

const toggleStatus = async (task: Task) => {
  if (!task.id) return;
  try {
    const updatedTask = await AutheService.updateNone(task.id, {
      done: !task.done
    });
    task.done = updatedTask.done;
  } catch (error) {
    alert("No se pudo actualizar el estado");
  }
};


async function onDelete(task: Task) {
  if (task.id && confirm('¿Eliminar tarea?')) {
    await store.deleteTask(task.id)
  }
}

</script>

<template>
  <v-card flat>
    <template #title>
      <div class="d-flex align-center justify-space-between w-100">
        <span class="text-h6">Gestión de tareas</span>
        <v-btn color="primary" @click="newTask">
          <v-icon icon="mdi-plus" />
              Nueva Tarea
        </v-btn>
      </div>
    </template>
    <v-divider />

    <v-card-text>
      <h2>Lista tareas</h2>
      <v-table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Completada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tarea in tasks" :key="tarea.id">
            <td>{{ tarea.id }}</td>
            <td>{{ tarea.name }}</td>
            <td>{{ tarea.done ? 'Finalizada' : 'Pendiente' }}
              <v-checkbox-btn
                :model-value="tarea.done"
                @click.stop="toggleStatus(tarea)"
                color="success"
              ></v-checkbox-btn>
            </td>
            <td>
              <v-btn icon @click="updateTask(tarea)">
                <v-icon icon="mdi-pencil" />
              </v-btn>
              <v-btn icon @click="onDelete(tarea)">
                <v-icon icon="mdi-delete" />
              </v-btn>
            </td>
          </tr>
        </tbody>
        </v-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>
section {
  margin-bottom: 24px;
}
.error {
  color: red;
  margin-top: 12px;
}
</style>
