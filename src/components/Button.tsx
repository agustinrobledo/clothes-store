interface buttonProps {
  filled?: boolean
  color?: string
  children: React.ReactNode
  className: string
}

const Button = ({ filled, color = 'black', children, className }: buttonProps) => {

  return (
    <button
      className={`border-2 border-black rounded-md ${filled ? `bg-${color}` : 'bg-transparent'} ${className}`}
    >{children}</button>
  )
}

export default Button
