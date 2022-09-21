import axios from 'axios';
import Image from 'next/image';
import React, { memo, useMemo, useState } from 'react';
import { GoVerified } from 'react-icons/go';
import { IUser, Video } from '../../types';



interface IProps {
    userData: IUser;
    createdPosts: Video[];
    likedPosts: Video[];
}

// GET SERVER SIDE PROPS
export async function getServerSideProps({
    params: { id }
}: { params: { id: string } }) {

    // GET USER DATA
    const { data: { userData, createdPosts, likedPosts } } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`)

    return {
        props: {
            userData,
            createdPosts,
            likedPosts,
        }
    }
}



const UserProfile: React.FC<IProps> = ({
    userData,
    createdPosts,
    likedPosts,
}) => { 

    /////////////////////
    // STATE ////////////
    /////////////////////
    
    const [state, setState] = useState({
        // IF CREATED POSTS IS NOT EMPTY, THEN SHOW IT FIRST, ELSE IF LIKED POSTS IS NOT EMPTY, SHOW IT INSTEAD, ELSE JUST DEFAULT TO CREATED POSTS
        isShowingCreated: createdPosts.length > 0 ? true : likedPosts.length > 0 ? false : true,
    });


    /////////////////////
    // MEMO /////////////
    /////////////////////

    const showingPosts = useMemo(() => state.isShowingCreated ? createdPosts : likedPosts,[createdPosts, likedPosts, state.isShowingCreated]);


    /////////////////////
    // STYLES ///////////
    /////////////////////

    const selectedTabStyle = 'border-b-2 border-blue-800 font-bold text-black mb-1';

    const normalTabStyle = 'cursor-pointer color-gray-300 font-semibold mb-1';

    /////////////////////
    // RENDER ///////////
    /////////////////////

    return (
        <div className='w-full h-full bg-gray-100 rounded-lg border border-gray-300 flex flex-col justify-start items-start'>

            {/* PROFILE PIC + USERNAME ROW */}
            <div className='flex gap-3 p-4 font-semibold rounded'>
                {/* USER IMAGE */}
                <div className='md:w-28 md:h-28 w-15 h-15'>
                    <Image
                        width={62}
                        height={62}
                        className="rounded-full"
                        src={userData.image}
                        alt="Profile pic"
                        layout="responsive"
                    />
                </div>

                {/* USERNAME */}

                <div className='flex items-center flex-col gap-2'>
                    <p className='flex items-center gap-1 md:text-lg font-bold text-primary'>
                        {userData.userName}
                        <GoVerified className='text-blue-400 text-md' />
                    </p>
                    <p className='capitalize font-medium text-sm text-gray-500 hidden md:block'>
                        {userData.userName}
                    </p>
                </div>
            </div>
            
            {/* SELECT TAB */}
            <div className='flex justify-start items-center border-b border-gray-300 gap-4 w-full mt-10 pl-4'>
                <div className={state.isShowingCreated ? selectedTabStyle : normalTabStyle}>Videos</div>
                <div className={!state.isShowingCreated ? selectedTabStyle : normalTabStyle}>Liked</div>
            </div>

            {/* CREATED/LIKED POSTS */}
            {

            }
        </div>
    )
};

export default memo(UserProfile);
