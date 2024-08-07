import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import taskStore from '../../app/stores/TaskStore'
import TaskItem from '../../shared/ui/taskItem'

const TaskList: FC = () => {
    return (
        <div className='my-5'>
            {taskStore.tasks.map((task) => (
                <TaskItem key={task.id} task={task} level={0} />
            ))}
        </div>
    )
}

export default observer(TaskList)
