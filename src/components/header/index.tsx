import { BsArrowLeft } from 'react-icons/bs'

export const Header = () => {
  return (
    <div>
      <div className="flex shadow-lg p-[30px] gap-4 pl-[10rem]">
        <div className='pt-[5px] cursor-pointer'><BsArrowLeft /></div>
        <div className="border-slate-300 border"></div>
        <div>
          <h3 className='font-medium'>Event</h3>
        </div>
      </div>
    </div>
  )
}