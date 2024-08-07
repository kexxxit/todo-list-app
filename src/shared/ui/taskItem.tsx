import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import taskStore from '../../app/stores/TaskStore'
import { Task } from '../types/Task'
import { Button } from './button'

interface TaskItemProps {
    task: Task
    level: number
}

const TaskItem: FC<TaskItemProps> = ({ task, level }) => {
    const handleToggleCompletion = () => {
        taskStore.toggleTaskCompletion(task.id)
    }

    const handleToggleExpansion = () => {
        taskStore.toggleTaskExpansion(task.id)
        taskStore.setActiveTask(task.id)
    }

    const handleDelete = () => {
        taskStore.activeTaskId === task.id && taskStore.setActiveTask(undefined)
        taskStore.deleteTask(task.id)
    }

    return (
        <div
            className={
                (task.id === taskStore.activeTaskId ? 'bg-[#DCE0E1]' : '') +
                ' rounded-[8px] px-4'
            }
            style={{ marginLeft: level * 2 }}>
            <span className='cursor-pointer' onClick={handleToggleExpansion}>{task.taskName}</span>
            <input
                type='checkbox'
                checked={task.completed}
                onChange={handleToggleCompletion}
            />
            <Button onClick={handleDelete} isDisabled={false} type='button'>
                Delete
            </Button>

            {task.expanded && task.subtasks.length > 0 && (
                <div className=''>
                    {task.subtasks.map((subtask) => (
                        <TaskItem
                            key={subtask.id}
                            task={subtask}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default observer(TaskItem)
