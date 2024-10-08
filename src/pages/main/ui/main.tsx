import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import TaskList from '../../../widgets/taskList/taskList'
import TaskCreationPopup from '../../../widgets/taskCreationPopup/taskCreationPopup'
import { Button } from '../../../shared/ui/button'
import { Task } from '../../../shared/types/Task'
import { useStores } from '../../../app/RootStoreContext'

export const Main = observer(() => {
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)
    const {
        tasks: { activeTaskId, getActiveTask, deleteCompletedTasks },
    } = useStores()
    const [activeTask, setActiveTask] = useState<Task | undefined>(undefined)

    useEffect(() => {
        setActiveTask(getActiveTask())
    }, [activeTaskId])

    return (
        <>
            {popupIsOpen && (
                <TaskCreationPopup onClose={() => setPopupIsOpen(false)} />
            )}

            <div className='grid grid-cols-2 h-full'>
                <div className='p-5'>
                    <div className='flex justify-between'>
                        <Button
                            type='button'
                            onClick={() => {
                                setPopupIsOpen(!popupIsOpen)
                            }}
                            isDisabled={false}>
                            +
                        </Button>
                        <Button
                            type='button'
                            onClick={() => {
                                deleteCompletedTasks()
                            }}
                            isDisabled={false}>
                            Удалить отмеченные
                        </Button>
                    </div>
                    <TaskList />
                </div>

                <div className='bg-[#DCE0E1] h-full p-5'>
                    <h2 className='text-xl font-semibold'>
                        {activeTask?.taskName}
                    </h2>
                    <h4 className='text-[16px]'>{activeTask?.text}</h4>
                </div>
            </div>
        </>
    )
})
