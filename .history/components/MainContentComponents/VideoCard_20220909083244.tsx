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
      {/* WRAPPER */}
      <div className=''>
        {/* PROFILE PIC + USERNAME ROW */}
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          {/* USER IMAGE */}
          <div className='md:w-16 md:h-16 w-10 h-10'>
              <Link href={`/user/${post.postedBy._id}`}>
                <>
                  <Image 
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="Profile pic"
                    layout="responsive"
                  />
                </>
              </Link>
          </div>

          {/* USERNAME */}
          <div className=''>
             <Link href={`/user/${post.postedBy._id}`}>
              <div className='flex items-center gap-2'>
                <p className='flex items-center gap-1 md:text-md font-bold text-primary'>
                  {post.postedBy.userName}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
             </Link>
          </div>
        </div>
      </div>
      

      {/* VIDEO */}
      <div className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl'>
          {/* LEADS TO VIDEO DETAILS PAGW */}
          <Link href="/">
            <video
              loop
              controls
              src={post.video.asset.url}
              className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer" 
            ></video>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;