import React, { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import taskStore from '../../app/stores/TaskStore'
import { Button } from '../../shared/ui/button'

type TaskCreationPopupProps = {
    onClose: () => void
}

const TaskCreationPopup: FC<TaskCreationPopupProps> = ({ onClose }) => {
    const [taskName, setTaskName] = useState('')
    const [text, setText] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        taskStore.addTask(
            {
                id: Date.now().toString(),
                taskName,
                text,
                completed: false,
                subtasks: [],
                expanded: false,
            },
            taskStore.activeTaskId
        )
        setText('')
        onClose()
    }

    return (
        <div className='w-full h-full bg-black/[.3] fixed top-0 left-0 flex items-center justify-center'>
            <div>
                <div className='flex justify-end '>
                    <span onClick={() => onClose()} className='cursor-pointer'>X</span>
                </div>
                <form
                    className='w-100 h-auto py-16 px-5 
                        bg-[#DCE0E1] flex flex-col rounded-[20px]'
                    onSubmit={handleSubmit}>
                    <input
                        className='w-full mb-2'
                        type='text'
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder='Название задачи'
                    />
                    <input
                        className='w-full mb-2'
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Текст задачи'
                    />
                    <Button type='submit' onClick={() => {}} isDisabled={false}>
                        Создать задачу
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default observer(TaskCreationPopup)
