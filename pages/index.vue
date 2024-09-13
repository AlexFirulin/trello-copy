<template>
  <v-card>
   <v-row>
    <v-col v-for="(tasks, status) in groupedTasks" :key="status">
      <DraggableList :tasks="tasks" :title="status"/>
    </v-col>
  </v-row>
</v-card>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/tasksStore';

const loading = ref(true);
const store = useTaskStore()
const groupedTasks = computed(() => store.groupedByStatus);

const loadTasks = async () => {
  try {
    await store.getAllTasks();
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadTasks();
});
</script>
