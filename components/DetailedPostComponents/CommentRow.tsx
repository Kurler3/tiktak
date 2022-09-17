import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Comment } from "../../types";


// PROPS
interface IProps {
    comment: Comment;
}

///////////////////
// COMMENT ROW ////
///////////////////

const CommentRow:React.FC<IProps> = ({
    comment,
}) => {

    console.log("Comment: ", comment);
    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div className="border-b border-gray-400 mb-3 flex items-center justify-start p-4">
            
           {/* USER PROFILE IMAGE */}
           {/* <div className='md:w-15 md:h-15 w-12 h-12 ml-4'>
                            <Link href={`/user/${comment.postedBy._id}`}>
                                <>
                                    <Image
                                        width={62}
                                        height={62}
                                        className="rounded-full"
                                        src={comment.postedBy.image}
                                        alt="Profile pic"
                                        layout="responsive"
                                    />
                                </>
                            </Link>
            </div> */}

            <span>{comment.comment}</span>
        </div>
    );
};

export default memo(CommentRow);