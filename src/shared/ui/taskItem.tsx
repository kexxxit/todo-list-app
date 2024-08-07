import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import taskStore from '../../app/stores/TaskStore'
import { Task } from '../types/Task'
import { Button } from './button'
import { IoCloseOutline, IoChevronUp, IoChevronDown } from 'react-icons/io5'
import { useStores } from '../../app/RootStoreContext'

interface TaskItemProps {
    task: Task
    level: number
}

const TaskItem: FC<TaskItemProps> = ({ task, level }) => {
    const {
        tasks: {
            activeTaskId,
            deleteTask,
            toggleTaskExpansion,
            setActiveTask,
            toggleTaskCompletion,
        },
    } = useStores()

    const handleToggleCompletion = () => {
        toggleTaskCompletion(task.id)
    }

    const handleToggleExpansion = () => {
        toggleTaskExpansion(task.id)
    }

    const handleSetTaskActive = () => {
        setActiveTask(task.id)
    }

    const handleDelete = () => {
        activeTaskId === task.id && setActiveTask(undefined)
        deleteTask(task.id)
    }

    return (
        <>
            <div
                className={
                    (task.id === taskStore.activeTaskId ? 'bg-[#DCE0E1]' : '') +
                    ' rounded-[8px] px-4 grid grid-cols-[20px_1fr_50px] items-center'
                }
                style={{ marginLeft: level * 10 }}>
                <div>
                    {task.subtasks.length > 0 &&
                        (task.expanded ? (
                            <IoChevronUp
                                className='cursor-pointer'
                                onClick={handleToggleExpansion}
                            />
                        ) : (
                            <IoChevronDown
                                className='cursor-pointer'
                                onClick={handleToggleExpansion}
                            />
                        ))}
                </div>
                <span
                    className='cursor-pointer overflow-hidden text-ellipsis'
                    onClick={handleSetTaskActive}>
                    {task.taskName}
                </span>
                <div className='flex justify-end'>
                    <input
                        type='checkbox'
                        checked={task.completed}
                        onChange={handleToggleCompletion}
                    />
                    <IoCloseOutline
                        className='cursor-pointer'
                        onClick={handleDelete}
                    />
                </div>
            </div>
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
        </>
    )
}

export default observer(TaskItem)
