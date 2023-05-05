import React from "react"

interface buttonProps extends React.ButtonHTMLAttributes<HTMLElement> {
    filled?: boolean
    color?: string
    children: React.ReactNode
    border?: boolean
    icon?: React.ReactNode
    className?: string
}

const Button = ({
    filled,
    color = "black",
    children,
    className,
    border = true,
    icon,
    ...rest
}: buttonProps) => {
    return (
        <button
            className={`${
                border ? "border-2 border-black" : ""
            } px-4 rounded-xl ${
                filled ? `bg-${color}` : "bg-transparent"
            } duration-300 hover:bg-black hover:text-white ${className}`}
            {...rest}
        >
            {icon}
            {children}
        </button>
    )
}

export default Button
