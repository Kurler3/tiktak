import React, {memo, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {GoVerified} from 'react-icons/go';
import useAuthStore from '../../store/authStore';
import NoResults from '../MainContentComponents/NoResults';
import {BiCommentX, BiSend } from 'react-icons/bi';
import {AiOutlineLoading} from 'react-icons/ai';
import { Comment } from '../../types';
import CommentRow from './CommentRow';


interface IProps {
    isPostingComment: boolean;
    handleCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    commentContent: string;
    comments: Comment[];
    handleCreateComment: (e: React.SyntheticEvent) => void;
}

//////////////////////
// COMMENT SECTION ///
//////////////////////

const CommentSection:React.FC<IProps> = ({
    isPostingComment,
    handleCommentChange,
    commentContent,
    comments,
    handleCreateComment
}) => {

    // USER PROFILE
    const {userProfile, allUsers} = useAuthStore();

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
                        {comments.map((comment, index) => {

                            const commentAuthor =  allUsers?.find((user) => user._id === comment.postedBy._id)

                            // IF AUTHOR DOES NOT EXIST, THEN DON'T SHOW COMMENT
                            return !commentAuthor ? null : (
                                <CommentRow
                                    key={`comment_section_comment_${comment._key}_${index}`}
                                    comment={comment}
                                    commentAuthor={commentAuthor}
                                    currentUserId={userProfile?._id ?? null}
                                />
                            )
                        })}
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
                    <div className='absolute bottom-0 left-0 pb-6 pr-8 w-full flex gap-4 justify-start items-center'>

                        {/* USER PROFILE IMAGE */}
                        <div className='md:w-15 md:h-15 w-12 h-12 ml-4'>
                            <Link href={`/user/${userProfile._id}`}>
                                <>
                                    <Image
                                        width={62}
                                        height={62}
                                        className="rounded-full"
                                        src={userProfile.image}
                                        alt="Profile pic"
                                        layout="responsive"
                                    />
                                </>
                            </Link>
                        </div>


                        <form onSubmit={handleCreateComment} className="flex gap-4 flex-1">
                            <input
                                value={commentContent}
                                onChange={handleCommentChange}
                                placeholder="Add comment..."
                                className='
                                bg-primary px-6 py-4 text-md font-medium border-2 w-full
                                  border-gray-200 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg transition focus:shadow-xl
                                '
                               
                            />
                            <button
                                type="submit"
                                className='text-[14px] border border-gray-300 px-2 rounded-md bg-blue-400 text-white w-[60px] flex justify-center items-center'
                            >
                                {
                                    isPostingComment ?
                                    <AiOutlineLoading  className='rotating' fontSize={25}/>
                                    :
                                    <BiSend  fontSize={25}/>
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