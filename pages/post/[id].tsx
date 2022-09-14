import {memo, useState, useEffect, useRef, useCallback} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
    GoVerified,
} from 'react-icons/go';
import {
    MdOutlineCancel
} from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import {
    HiVolumeUp,
    HiVolumeOff,
} from 'react-icons/hi';
import axios from 'axios';
import {Video} from '../../types';
import { NextPage } from 'next';

// USE SERVER SIDE PROPS TO FETCH POST DATA!
export const getServerSideProps = async ({
    params: {id}
} : {params: {id: string}}) => {

    const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)

    return {
        props: {
            postDetails: data[0],
        },
    };
}


// PROPS INTERFACE
interface IProps {
    postDetails: Video;
}

////////////////////
// POST DETAIL /////
////////////////////

const PostDetail:NextPage<IProps> = ({
    postDetails,
}) => {

    ////////////
    // REF /////
    ////////////

    const videoRef = useRef<HTMLVideoElement>(null);

    
    ////////////
    // STATE ///
    ////////////

    const [state, setState] = useState({
        post: postDetails,
        isVideoPlaying: false,
        isVideoMuted: false,
    });


    //////////////////
    // FUNCTIONS /////
    //////////////////

    // HANDLE PAUSE/PLAY VIDEO
    const onVideoClick = useCallback(() => {

        setState((prevState) => {

            if(prevState.isVideoPlaying) {
                // STOP VIDEO
                videoRef?.current?.pause();
            }
            else {
                // START VIDEO
                videoRef?.current?.play();
            }

            return {
                ...prevState,
                isVideoPlaying: !prevState.isVideoPlaying
            };
        });

    } ,[]);

    // HANDLE MUTE/UNMUTE VIDEO
    const handleMuteUnmuteVideo = useCallback(() => {

  
            setState((prevState) => {

                if(videoRef.current) {
                    // IF WAS MUTED, UNMUTE
                    if(prevState.isVideoMuted) {
                        videoRef.current.muted = false;
                    }
                    // ELSE MUTE
                    else {
                        videoRef.current.muted = true;
                    }
                }
                
    
                return {
                    ...prevState,
                    isVideoMuted: !prevState.isVideoMuted,
                };
    
            });
        
        
     }, []);


    ///////////////
    // RENDER /////
    ///////////////

    return !state.post ? null : (
        <div
            className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap"
        >
           {/* WRAPPER DIV */}
           <div
            className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black"
           >

                {/* CANCEL BTN */}
                <div
                    className="absolute top-6 left-2 lg:left-6 fflex gap-6 z-50 cursor-pointer"
                >   
                    <p>
                        <MdOutlineCancel className="text-white text-[35px]" />
                    </p>
                </div>  

                {/* VIDEO VIEW */}
                <div className='relative'>
                    <div
                        className="lg:h-[100vh] h-[60vh]"
                    >   
                        <video
                            ref={videoRef}
                            loop
                            onClick={onVideoClick}
                            src={state.post.video?.asset?.url}
                            className="h-full cursor-pointer"
                        >

                        </video>
                    </div>

                    {/* PLAY ICON */}
                    <div
                        className="absolute top-[45%] left-[45%]"
                    >

                        {
                            !state.isVideoPlaying ?
                            (
                                <button
                                    
                                    onClick={onVideoClick}
                                >
                                    <BsFillPlayFill 
                                        className="text-white text-6xl lg:text-8xl"
                                    />
                                </button>
                            )
                        :null}  
                    </div>     
                </div>    

                {/* MUTE */}
                <div
                    className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer"
                >
                    <button
                        onClick={handleMuteUnmuteVideo}
                    >
                        {
                            state.isVideoMuted ?
                            (
                                <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
                            )
                            :
                            (
                                <HiVolumeUp className="text-white text-2xl lg:text-4xl"/>
                            )
                        }
                    </button>

                </div>

           </div>
        </div>
    )
};

export default memo(PostDetail);