import { makeAutoObservable, reaction } from 'mobx'
import { Task } from '../../shared/types/Task'

class TaskStore {
    tasks: Task[] = localStorage.tasks ? JSON.parse(localStorage.tasks) : []

    activeTaskId: string | undefined =
        localStorage.activeTaskId && this.tasks.length > 0
            ? JSON.parse(localStorage.activeTaskId)
            : undefined

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.tasks,
            (tasks) => {
                localStorage.setItem('tasks', JSON.stringify(tasks))
                if (tasks.length === 0) {
                    localStorage.removeItem('task')
                    localStorage.removeItem('activeTaskId')
                }
            }
        )

        reaction(
            () => this.activeTaskId,
            (activeTaskId) => {
                if (activeTaskId) {
                    localStorage.setItem(
                        'activeTaskId',
                        JSON.stringify(activeTaskId)
                    )
                } else {
                    localStorage.removeItem('activeTaskId')
                }
            }
        )
    }

    addTask = (task: Task, parentId?: string) => {
        if (parentId) {
            this.findTaskById(parentId)?.subtasks.push(task)
            this.tasks = JSON.parse(JSON.stringify(this.tasks))
        } else {
            // this.tasks.push(task)
            this.tasks = [...this.tasks, task]
        }
    }

    toggleTaskCompletion = (id: string) => {
        const task = this.findTaskById(id)
        if (task) {
            const copy: Task = JSON.parse(JSON.stringify(task))
            const completed = !copy.completed
            copy.completed = completed
            this.replaceTask(id, copy)
            this.updateSubtasksCompletion(copy, completed)
        }
    }

    toggleTaskExpansion = (id: string) => {
        const task = this.findTaskById(id)
        if (task) {
            const copy: Task = JSON.parse(JSON.stringify(task))
            copy.expanded = !copy.expanded
            this.replaceTask(id, copy)
        }
    }

    deleteTask = (id: string) => {
        this.tasks = this.tasks.filter((task) => task.id !== id)
        this.tasks.forEach((task) => this.deleteSubtask(task, id))
    }

    setActiveTask = (id: string | undefined) => {
        if (id && id === this.activeTaskId) {
            this.activeTaskId = undefined
        } else this.activeTaskId = id
    }

    getActiveTask = () => {
        return this.activeTaskId
            ? this.findTaskById(this.activeTaskId)
            : undefined
    }

    private findTaskById = (
        id: string,
        tasks: Task[] = this.tasks
    ): Task | undefined => {
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

    private updateSubtasksCompletion = (task: Task, completed: boolean) => {
        task.subtasks.forEach((subtask) => {
            const copy: Task = JSON.parse(JSON.stringify(subtask))
            copy.completed = completed
            this.replaceTask(copy.id, copy)
            this.updateSubtasksCompletion(copy, completed)
        })
    }

    private deleteSubtask = (task: Task, id: string) => {
        task.subtasks = task.subtasks.filter((subtask) => subtask.id !== id)
        task.subtasks.forEach((subtask) => this.deleteSubtask(subtask, id))
    }

    private replaceTask = (id: string, newTask: Task) => {
        this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task))
        this.tasks.forEach((task) => this.replaceSubtask(task, id, newTask))
    }

    private replaceSubtask = (task: Task, id: string, newTask: Task) => {
        task.subtasks = task.subtasks.map((subtask) =>
            subtask.id === id ? newTask : subtask
        )
        task.subtasks.forEach((subtask) =>
            this.replaceSubtask(subtask, id, newTask)
        )
    }
}

const taskStore = new TaskStore()

export default taskStore
