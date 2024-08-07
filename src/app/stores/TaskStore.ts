import { makeAutoObservable } from 'mobx'
import { Task } from '../../shared/types/Task'

class TaskStore {
    tasks: Task[] = []

    activeTaskId: string | undefined = undefined

    constructor() {
        makeAutoObservable(this)
    }

    addTask(task: Task, parentId?: string) {
        if (parentId) {
            this.findTaskById(parentId)?.subtasks.push(task)
        } else {
            this.tasks.push(task)
        }
    }

    toggleTaskCompletion(id: string) {
        const task = this.findTaskById(id)
        if (task) {
            const copy: Task = JSON.parse(JSON.stringify(task))
            copy.completed = !copy.completed
            this.replaceTask(id, copy)
            this.updateSubtasksCompletion(task)
        }
    }

    toggleTaskExpansion(id: string) {
        const task = this.findTaskById(id)
        if (task) {
            const copy: Task = JSON.parse(JSON.stringify(task))
            copy.expanded = !copy.expanded
            this.replaceTask(id, copy)
        }
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter((task) => task.id !== id)
        this.tasks.forEach((task) => this.deleteSubtask(task, id))
    }

    setActiveTask(id: string | undefined) {
        this.activeTaskId = id
    }

    private findTaskById(
        id: string,
        tasks: Task[] = this.tasks
    ): Task | undefined {
        for (const task of tasks) {
            if (task.id === id) {
                return task
            }
            if (task.subtasks.length > 0) {
                const subtask = this.findTaskById(id, task.subtasks)
                if (subtask) {
                    return subtask
                }
            }
        }
        return undefined
    }

    private updateSubtasksCompletion(task: Task) {
        task.subtasks.forEach((subtask) => {
            const copy: Task = JSON.parse(JSON.stringify(subtask))
            copy.completed = !copy.completed
            this.replaceTask(copy.id, copy)
            subtask.completed = task.completed
            this.updateSubtasksCompletion(subtask)
        })
    }

    private deleteSubtask(task: Task, id: string) {
        task.subtasks = task.subtasks.filter((subtask) => subtask.id !== id)
        task.subtasks.forEach((subtask) => this.deleteSubtask(subtask, id))
    }

    private replaceTask(id: string, newTask: Task) {
        this.tasks = this.tasks.map(task => task.id === id ? newTask : task)
        this.tasks.forEach(task => this.replaceSubtask(task, id, newTask))
    }

    private replaceSubtask(task: Task, id: string, newTask: Task) {
        task.subtasks = task.subtasks.map(subtask => subtask.id === id ? newTask : subtask)
        task.subtasks.forEach(subtask => this.replaceSubtask(subtask, id, newTask))
    }
}

const taskStore = new TaskStore()
export default taskStore
