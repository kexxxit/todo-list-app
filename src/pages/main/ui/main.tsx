import React, { useState } from 'react'
import TaskList from '../../../widgets/taskList/taskList'
import TaskCreationPopup from '../../../widgets/taskCreationPopup/taskCreationPopup'
import { Button } from '../../../shared/ui/button'

export const Main = () => {
    const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false)

    return (
        <>
            {popupIsOpen && (
                <TaskCreationPopup onClose={() => setPopupIsOpen(false)} />
            )}

            <div className='grid grid-cols-2 h-full'>
                <div className='p-5'>
                    <Button
                        type='button'
                        onClick={() => {
                            setPopupIsOpen(!popupIsOpen)
                        }}
                        isDisabled={false}>
                        +
                    </Button>
                    <TaskList />
                </div>

                <div className='bg-[#DCE0E1] h-full p-5'></div>
            </div>
        </>
    )
}
