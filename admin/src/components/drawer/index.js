import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

const Drawer = ({children, show, setShow, width}) => {
  return (
    <div className={`drawer ${show && 'active'}`}style={{width: width && width}}>
      <IoIosCloseCircleOutline onClick={() => setShow(false)} className="close-drawer"/>
      <div className="drawer-body">
        {children}
      </div>
    </div>
  )
}

export default Drawer