import {memo, useState, useEffect, useCallback} from 'react';
import {MdFavorite} from 'react-icons/md';
import useAuthStore from '../../store/authStore';



interface IProps {
    handleLikeDislike: (isDisliking:boolean) => void;
}

//////////////////
// LIKE BUTTON ///
//////////////////


const LikeButton:React.FC<IProps> = ({
    handleLikeDislike,
}) => {  

    /////////////////
    // ZUSTAND //////
    /////////////////

    const {userProfile} = useAuthStore();

    /////////////////
    // STATE  ///////
    /////////////////

    const [state, setState] = useState({
        alreadyLiked: false,
    });


    /////////////////
    // RENDER ///////
    /////////////////

    return (
        <div
            className="gap-6"
        >
            <div className="mt-4 flex flex-col items-center justify-center cursor-pointer">
                {
                    state.alreadyLiked ?
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51197]"
                        onClick={() => handleLikeDislike(true)}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                    :
                    <div className="bg-primary rounded-full p-2 md:p-4 text-[#F51197]"
                        onClick={() => handleLikeDislike(false)}
                    >
                        <MdFavorite className="text-lg md:text-2xl" />
                    </div>
                }
                <p className="text-md font-semibold">
                    likes?.legth || 0
                </p>    
            </div>
            
        </div>
    );
};

export default memo(LikeButton);