
<script setup lang="ts">
import { useTaskStore } from "~/stores/tasksStore";
import type { task } from "~/types/types";
const store = useTaskStore();
interface taskEmit {
  (event: "update:task", task: task): void;
}
const emits = defineEmits<taskEmit>();

const isDialogVisible = ref<boolean>(false);
const newTask = ref({
  name: "",
  description: "",
  responsiblePerson: "",
  priority: "",
  status: "",
  assignees: []
});

const createTask = () => {
    emits('update:task', newTask.value)
    toggleDialog();
};
const usersList = computed((): string[] => {
  return store.tasks.map((task) => task.responsiblePerson);
});

const toggleDialog = () => {
  isDialogVisible.value = !isDialogVisible.value;
};
</script>

<template>
  <v-card>
    <v-card-actions>
      <v-btn text="Create task" @click="toggleDialog" />
    </v-card-actions>
    <v-dialog v-model="isDialogVisible">
      <v-sheet class="mx-auto pa-2" width="400">
        <h3>Create task</h3>
        <v-form fast-fail @submit.prevent="createTask">
          <v-text-field v-model="newTask.name" label="Task name" required />
          <v-textarea
            v-model="newTask.description"
            label="Task description"
            required
          ></v-textarea>
          <v-select
            v-model="newTask.responsiblePerson"
            label="Responsible user"
            :items="usersList"
            variant="solo-filled"
          ></v-select>
          <v-select
            v-model="newTask.assignees"
            multiple
            label="Assignees"
            :items="usersList"
            variant="solo-filled"
            required
          ></v-select>
          <v-btn class="ma-2" @click="toggleDialog">Close</v-btn>
          <v-btn class="ma-2" type="submit" >Create</v-btn>
        </v-form>
      </v-sheet>
    </v-dialog>
  </v-card>
</template>
