import React from 'react'
import { IconType } from 'react-icons';
import {BiCommentX } from 'react-icons/bi';

interface IProps {
  text: string;
  iconComponent?: any;
}

const NoResults:React.FC<IProps> = ({
  text,
  iconComponent,
}) => {
  
  /////////////
  // RENDER ///
  /////////////
  <BiCommentX />
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {
        iconComponent ?
        iconComponent
        : null
      }
      
      <p className='text-2xl text-center'>
        {text}
      </p>
    </div>
  );
}

export default NoResults