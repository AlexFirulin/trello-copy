<script setup lang="ts">
import type { task } from "~/types/types";
import { VueDraggable } from "vue-draggable-plus";
import { useTaskStore } from '~/stores/tasksStore';
const store = useTaskStore()

interface ITasksProps {
  tasks: task[];
  title: string;
}

const props = defineProps<ITasksProps>();
const { tasks } = toRefs(props);
const tasksList = ref<task[]>([]);

const cloneTasks = (): void => {
  tasksList.value = tasks.value.map((task) => ({ ...task }));
};

const addTask = (task: task):void => {
  tasksList.value.push(task)
}

const deleteTask = (taskName: string): void => {
tasksList.value = tasksList.value.filter(task => task.name !== taskName)
}

onMounted(() => cloneTasks());
</script>
<template>
  <ClientOnly>
    <v-card :title="props.title">
      <VueDraggable
        v-model="tasksList"
        ghostClass="ghost"
        group="tasks"
      >
        <TaskCard 
          v-for="item in tasksList"
          :key="item.name"
          :task="item"
          class="ma-2"
          variant="elevated"
          @delete:task="deleteTask"
        >
        </TaskCard>
      </VueDraggable>
      <v-card-actions>
        <CreateTaskModal @update:task="addTask" />
      </v-card-actions>
    </v-card>
  </ClientOnly>
</template>
