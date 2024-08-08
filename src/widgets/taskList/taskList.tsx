import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import taskStore from '../../app/stores/TaskStore'
import TaskItem from '../../shared/ui/taskItem'
import { useStores } from '../../app/RootStoreContext'

const TaskList: FC = () => {
    const {
        tasks: { tasks, searchedTasks, search, setSearch },
    } = useStores()
    return (
        <div className='my-5'>
            <input
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                value={search}
                placeholder='Поиск'
                className='outline-none bg-[#DCE0E1] rounded-full px-4 w-full mb-5'
            />
            {(search.trim() === '' ? tasks : searchedTasks).map((task) => (
                <TaskItem key={task.id} task={task} level={0} />
            ))}
        </div>
    )
}

export default observer(TaskList)
