import {memo, useState, useEffect, useCallback, useMemo} from 'react';
import {MdFavorite} from 'react-icons/md';
import useAuthStore from '../../store/authStore';



interface IProps {
    handleLikeDislike: (isDisliking:boolean) => void;
    likes: any[] | null;
}

//////////////////
// LIKE BUTTON ///
//////////////////


const LikeButton:React.FC<IProps> = ({
    handleLikeDislike,
    likes,
}) => {  
  
    /////////////////
    // ZUSTAND //////
    /////////////////

    const {userProfile} = useAuthStore();

    //////////////////
    // STATE  ////////
    //////////////////

    const [isAlreadyLiked, setIsAlreadyLiked] = useState(likes?.find((like) => like._ref === userProfile?._id) !== undefined);


    useEffect(() => {
        if(isAlreadyLiked && likes?.find((like) => like._ref === userProfile?._id) === undefined) {
            setIsAlreadyLiked(false);
        }
        else if(!isAlreadyLiked && likes?.find((like) => like._ref === userProfile?._id) !== undefined) {
            setIsAlreadyLiked(true);
        }
    }, [isAlreadyLiked, likes, userProfile?._id]);

    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div
            className="gap-6"
        >
            <div className="mt-4 flex flex-col items-center justify-center cursor-pointer">
                {
                    isAlreadyLiked ?
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51197]"
                        onClick={() => {
                            setIsAlreadyLiked(false);
                            handleLikeDislike(true)
                        }}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                    :
                    <div className="bg-primary rounded-full p-2 md:p-4 "
                        onClick={() => {
                            setIsAlreadyLiked(true);
                            handleLikeDislike(false)
                        }}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                }
                <p className="text-md font-semibold">
                   {likes?.length|| 0}
                </p>    
            </div>
            
        </div>
    );
};

export default memo(LikeButton);