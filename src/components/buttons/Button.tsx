const Button = (
  { 
    color,
    onClick,
    children
  }: 
  {
  color: string,
  onClick?: () => void;
  children: any
}) => {
  return (
    <>
      <button onClick={onClick} className={`font-medium rounded-md text-sm px-5 flex gap-2 items-center py-2.5 ${color}`}>
        {children}
      </button>
    </>
  )
}

export default Button;