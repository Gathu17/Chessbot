import React from 'react'
import { footer } from '../Data'

const Footer = () => {
  return (
    <>
  <div className="grid items-center justify-center w-full grid-cols-2 py-5 text-center shadow-2xl md:grid-cols-3 lg:flex shadow-white lg:shadow-none">
  {footer.map((items, index)=>(
        <React.Fragment key={index}>
            <p className={`${index === 5 ? '': 'md:border-r'} sm:px-[.2rem] md:px-2 lg:px-4 cursor-pointer`}>{items.menu}</p>
        </React.Fragment>
    ))}
  </div>
    </>
  )
}

export default Footer