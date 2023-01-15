import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = ({size}) => {
  return <BiLoaderAlt size={size || '30px'} className='loader' />;
};

export default Loader;
