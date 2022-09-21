import axios from 'axios';
import React, {memo} from 'react';
import { IUser, Video } from '../../types';



interface IProps {
    userData: IUser;
    createdPosts: Video[];
    likedPosts: Video[];
}

// GET SERVER SIDE PROPS
export async function getServerSideProps({
    params: {id}
} : {params:{id: string}}) {

    // GET USER DATA
    const {data : {userData, createdPosts, likedPosts}} = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`)

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
    
    return (
        <div className='w-full h-full bg-red-300'>
            
        </div>
    )
};

export default memo(UserProfile);
