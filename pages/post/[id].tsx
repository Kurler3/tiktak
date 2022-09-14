import { memo, useState, useEffect, useRef, useCallback } from 'react';
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
import { Video } from '../../types';
import { NextPage } from 'next';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/DetailedPostComponents/LikeButton';
import CommentSection from '../../components/DetailedPostComponents/CommentSection';

// USE SERVER SIDE PROPS TO FETCH POST DATA!
export const getServerSideProps = async ({
    params: { id }
}: { params: { id: string } }) => {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)

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

const PostDetail: NextPage<IProps> = ({
    postDetails,
}) => {

    /////////////
    // ZUSTAND //
    /////////////

    const {userProfile} = useAuthStore();

    ////////////
    // ROUTER //
    ////////////

    const router = useRouter();

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

            if (prevState.isVideoPlaying) {
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

    }, []);

    // HANDLE MUTE/UNMUTE VIDEO
    const handleMuteUnmuteVideo = useCallback(() => {


        setState((prevState) => {

            if (videoRef.current) {
                // IF WAS MUTED, UNMUTE
                if (prevState.isVideoMuted) {
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


    const handleLikeDislike = useCallback(async (isDisliking:boolean) => {
        
        // IF USER EXISTS
        if(userProfile) {
            // USE AXIOS.PUT TO UPDATE POST
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/like`, {
                userId: userProfile._id,
                postId: state.post._id,
                like: !isDisliking,
            })
            
            //TODO UPDATE THE CURRENT STATE AS WELL.
            setState((prevState) => {
                return {
                    ...prevState,
                    // POST: response.....
                }
            });

        }

    }, [state.post._id, userProfile]);


    ///////////////
    // RENDER /////
    ///////////////

    return !state.post ? null : (
        <div
            className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap"
        >
            {/* LEFT DIV (VIDEO) */}
            <div
                className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black"
            >

                {/* CANCEL BTN */}
                <div
                    className="absolute top-6 left-2 lg:left-6 fflex gap-6 z-50 cursor-pointer"
                    onClick={() => {
                        // REDIRECT BACK TO HOME PAGE
                        router.push('/');
                    }}
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
                                : null}
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
                                    <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
                                )
                                :
                                (
                                    <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
                                )
                        }
                    </button>

                </div>



            </div>

            {/* RIGHT DIV */}
            <div
                className="relative w-[1000px] md:w-[900px] lg:w-[700px]"
            >
                {/* WRAPPER */}
                <div className="lg:mt-20 mt-10">

                    {/* PROFILE PIC + USERNAME ROW */}
                    <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                        {/* USER IMAGE */}
                        <div className='md:w-20 md:h-20 w-16 h-16 ml-4'>
                            <Link href={`/user/${state.post.postedBy._id}`}>
                                <>
                                    <Image
                                        width={62}
                                        height={62}
                                        className="rounded-full"
                                        src={state.post.postedBy.image}
                                        alt="Profile pic"
                                        layout="responsive"
                                    />
                                </>
                            </Link>
                        </div>

                        {/* USERNAME */}
                        <div className=''>
                            <Link href={`/user/${state.post.postedBy._id}`}>
                                <div className='flex flex-col items-start gap-2 '>
                                    <p className='flex items-center gap-1 md:text-md font-bold text-primary'>
                                        {state.post.postedBy.userName}
                                        <GoVerified className='text-blue-400 text-md' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                        {state.post.postedBy.userName}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* CAPTION */}
                    <p
                        className="px-10 text-lg text-gray-600"
                    >
                        {state.post.caption}
                    </p>

                    {/* LIKE BTN */}
                    <div
                        className="mt-10 px-10"
                    >
                        {
                            userProfile && 
                            (
                                <LikeButton handleLikeDislike={handleLikeDislike}/>
                            )
                        }   
                    </div>

                    {/* COMMENTS */}
                    <CommentSection />

                </div>
            </div>

        </div>
    )
};

export default memo(PostDetail);