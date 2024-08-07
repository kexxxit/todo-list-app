import React, { FC } from 'react'

interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
    isDisabled: boolean
    type: 'submit' | 'reset' | 'button' | undefined
}

export const Button: FC<ButtonProps> = ({
    type,
    children,
    onClick,
    isDisabled,
}) => {
    console.log(isDisabled)
    return (
        <button
            type={type}
            disabled={isDisabled}
            className='bg-orange-400 hover:bg-orange-500 transition-all 
                rounded-full font-bold text-white px-[10px] py-[1px]'
            onClick={onClick}>
            {children}
        </button>
    )
}
