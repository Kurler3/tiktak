import {memo, useState, useEffect, useRef} from 'react';
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



// // USE SERVER SIDE PROPS TO FETCH POST DATA!
// export const getServerSideProps = async ({
//     params: {id}
// }) => {

//     const  { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)


// }


////////////////////
// POST DETAIL /////
////////////////////

const PostDetail = () => {



    return (
        <div>
            Post Detail!
        </div>
    )
};

export default memo(PostDetail);