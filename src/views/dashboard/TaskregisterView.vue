<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { CreateTask } from '@/interfaces/task.interface'
import router from '@/router'
import { rules } from '@/tools/rules'
import { VForm } from 'vuetify/components'
import { useAlert } from '@/composables/useAlert'
import { useRequest } from '@/composables/useRequest'
import { AutheService } from '@/services/task.service'


const { open } = useAlert()
const { run, error } = useRequest()

const taskregister = reactive<CreateTask>({
  name: '',
  done: false,
})

const form = ref<VForm | null>(null)

async function Submit() {
  await form.value?.validate()
  if (!form.value?.isValid) return

  try {
    console.log('Creando tarea', taskregister)
    await run(() => AutheService.create({
      name: taskregister.name,
      done: taskregister.done,
    }))
    open('Tarea creada', 'success')
    router.push({ name: 'tasks' })
  } catch {
    open(error.value ?? 'Error al crear tarea', 'error')
  }
}
</script>

<template>
  <v-card>
    <v-card-title>
      <span>Nueva Tarea</span>
    </v-card-title>
    <v-form ref="form" lazy-validation @submit.prevent="Submit">
      <v-card-text>
        <v-text-field
          v-model="taskregister.name"
          label="Título"
          type="text"
          required
          :rules="[rules.required, rules.minLength]"
        />

        <v-checkbox
          v-model="taskregister.done"
          label="Completada"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit">Guardar Tarea</v-btn>
        <v-btn text @click="router.push({ name: 'tasks' })">Cancelar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
