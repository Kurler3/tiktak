import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Comment, IUser } from "../../types";


// PROPS
interface IProps {
    comment: Comment;
    commentAuthor: IUser;
    currentUserId: string | null;
}

///////////////////
// COMMENT ROW ////
///////////////////

const CommentRow: React.FC<IProps> = ({
    comment,
    commentAuthor,
    currentUserId,
}) => {
    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className="border border-gray-300 mb-3 flex items-center justify-start py-4 px-2 rounded-lg shadow-lg">

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

            {/* DELETE BTN (IF OWNER) */}
            {
                currentUserId && comment.postedBy._id === currentUserId ?
                <div>DELETE</div>
            :null}
        </div>
    );
};

export default memo(CommentRow);