const ButtonOutline = (
  { 
    color,
    onClick,
    children
  }: 
  {
  color: string,
  onClick: () => void;
  children: any
}) => {
  return (
    <>
      <button onClick={() => onClick()} className={`font-medium px-[15px] py-[10px] border rounded-md text-sm flex gap-2 items-center mb-2 ${color}`}>
        {children}
      </button>
    </>
  )
}

export default ButtonOutline;