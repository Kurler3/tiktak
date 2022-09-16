import {memo, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {GoVerified} from 'react-icons/go';
import useAuthStore from '../../store/authStore';
import NoResults from '../MainContentComponents/NoResults';
import {BiCommentX } from 'react-icons/bi';


//////////////////////
// COMMENT SECTION ///
//////////////////////

const CommentSection = () => {

    // USER PROFILE
    const {userProfile} = useAuthStore();

    const comments = [];

    /////////////
    // STATE  ///
    /////////////

    const [state, setState] = useState({
        isPostingComment: false,
    });

    /////////////
    // RENDER ///
    /////////////

    return (
        <div 
            className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'    
        >
            <div className="overflow-scroll lg:h-[475px]">
                {
                    comments.length > 0 ?
                    <div>
                        Comments
                    </div>
                    :
                    <NoResults 
                        text="No Comments yet!"
                        iconComponent={
                            <p className='text-8xl'>
                                <BiCommentX />
                            </p>
                        }   
                    />
                }
            </div>

            {
                userProfile && (
                    <div className='absolute bottom-0 left-0 pb-6 px-6 md:px-10 w-full'>

                        {/* USER PROFILE IMAGE */}


                        <form onSubmit={() => {}} className="flex gap-4">
                            <input
                                value=""
                                onChange={() => {}}
                                placeholder="Add comment..."
                                className='
                                bg-primary px-6 py-4 text-md font-medium border-2 w-full
                                  border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg transition focus:shadow-xl
                            
                                '
                            />
                            <button
                                type="submit"
                                className='text-[14px] border border-gray-300 px-2 rounded-md bg-blue-400 text-white '
                            >
                                {
                                    state.isPostingComment ?
                                    'Commenting...'
                                    :
                                    'Comment'
                                }
                            </button>
                        </form>
                    </div>
                )
            }    

        </div>
    );
};

export default memo(CommentSection);