import React, {useState, useEffect, useRef} from 'react'
import { Video } from '../../types';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import {BsFillPlayFill, BsFillPauseFill, BsPlay} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';


interface IProps {
    post: Video;
}

const VideoCard:React.FC<IProps> = ({post}) => {


  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>

    </div>
  )
}

export default VideoCard;