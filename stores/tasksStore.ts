import { defineStore } from "pinia";
import type { task } from "~/types/types";
import { tasks } from "~/constants/baseTasks";

interface State {
  tasks: task[];
  columns: string[]
}

export const useTaskStore = defineStore({
  id: "tasks",
  state: (): State => ({
    tasks: [],
    columns: ['TODO', "In progress", "Done"] 
    }),
  actions: {
    async getAllTasks() {
      return this.tasks = tasks;
    }
  },
  getters: {
    groupedByStatus(state) {
      return state.tasks.reduce((groups, task) => {
        const status = task.status;
        if (!groups[status]) {
          groups[status] = [];
        }
        groups[status].push(task);
        return groups;
      }, {} as Record<string, task[]>);
    }
  }
});
