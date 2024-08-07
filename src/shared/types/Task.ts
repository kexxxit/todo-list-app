export interface Task {
    id: string;
    taskName: string;
    text: string;
    completed: boolean;
    subtasks: Task[];
    expanded: boolean;
  }