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
          <div>
             <Link href={`/user/${post.postedBy._id}`}>
              <div>
                <p>
                  {post.postedBy.userName}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
                
              </div>
             </Link>
          </div>

        </div>
      </div>

    </div>
  )
}

export default VideoCard;