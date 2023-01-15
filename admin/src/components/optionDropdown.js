import React,{ useState } from 'react';
import { BsThreeDots } from "react-icons/bs";

const OptionDropdown = ({children}) => {
  const [show, setshow] = useState(false);
  return (
    <div className={`option-dropdown ${show && 'active'}`} >
      <BsThreeDots onClick={() => setshow(!show)} className='icon' />
      <div onClick={() => setshow(!show)}>{children}</div>
    </div>
  )
}

export default OptionDropdown