interface buttonProps {
  filled?: boolean,
  color?: string,
  children: React.ReactNode
}

const Button = ({ filled, color = 'black', children }: buttonProps) => {

  return (
    <button
      className={`border-2 border-black rounded-md ${filled ? `bg-${color}` : 'bg-transparent'}`}
    >{children}</button>
  )
}

export default Button
