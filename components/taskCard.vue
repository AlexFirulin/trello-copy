<script lang="ts" setup>
import type { task } from "~/types/types";
interface taskCardProps {
    task: task
}
interface taskCardEmits {
    (event: "delete:task", task: string): void;
}

const props = defineProps<taskCardProps>();
const emits = defineEmits<taskCardEmits>();

const deleteTask = () => {
    emits('delete:task', props.task.name)
}
</script>

<template>
    <v-card :title="props.task.name" :text="props.task.description" :subtitle=" props.task.responsiblePerson">
        <v-card-item>
            Assignees 
            <v-chip v-for="(user, index) in props.task.assignees" :key="index">{{ user }}</v-chip>
        </v-card-item>  
        <template #append>
            <v-btn variant="text" text="x" @click="deleteTask"/> 
        </template>
    </v-card>
</template>