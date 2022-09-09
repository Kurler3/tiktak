import React from 'react'
import { Video } from '../../types';
import {NextPage} from 'next';

interface IProps {
    post: Video;
}

const VideoCard:React.FC<IProps> = ({post}) => {
  return (
    <div>{post.caption}</div>
  )
}

export default VideoCard;