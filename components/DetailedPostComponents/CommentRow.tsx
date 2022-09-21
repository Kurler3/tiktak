import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Comment, IUser } from "../../types";


// PROPS
interface IProps {
    comment: Comment;
    commentAuthor: IUser;
    currentUserId: string | null;
    handleDeleteComment: (commentId: string) => void;
}

///////////////////
// COMMENT ROW ////
///////////////////

const CommentRow: React.FC<IProps> = ({
    comment,
    commentAuthor,
    currentUserId,
    handleDeleteComment,
}) => {
    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className="border border-gray-300 mb-3 flex items-center justify-between py-4 px-2 rounded-lg shadow-lg">
            <div className="flex justify-start items-center">
            
                {/* USER PROFILE IMAGE */}
                <div className='md:w-13 md:h-13 w-10 h-10 cursor-pointer'>
                    <Link href={`/user/${commentAuthor._id}`}>
                        <>
                            <Image
                                width={62}
                                height={62}
                                className="rounded-full"
                                src={commentAuthor.image}
                                alt="Profile pic"
                                layout="responsive"
                            />
                        </>
                    </Link>
                </div>

                <span
                    className="ml-2"
                >
                    {comment.comment}
                </span>
            </div>
            {/* DELETE BTN (IF OWNER) */}
            {
                currentUserId && commentAuthor._id === currentUserId ?
                <button 
                    className="mr-4 transition hover:scale-[1.2]"
                    onClick={() => handleDeleteComment(comment._key)}    
                >
                    <AiFillDelete className="text-2xl text-red-500"/>
                </button>
            :null}
        </div>
    );
};

export default memo(CommentRow);