import axios from 'axios';
import { useRouter } from 'next/router';
import {memo } from 'react';
import NoResults from '../../components/MainContentComponents/NoResults';
import VideoCard from '../../components/MainContentComponents/VideoCard';
import { Video } from '../../types';
import { BASE_URL } from '../../utils/constants';



interface IProps {
    videos: Video[];
}

export async function getServerSideProps({
    params: {searchValue}
} : {params: {searchValue: string}}) {

    const {data} = await axios.get(`${BASE_URL}/api/search/${searchValue}`);

    return {
        props: {
            videos: data,
        }
    };
}   

//////////////////
// SEARCH PAGE ///
//////////////////

const SearchPage: React.FC<IProps> = ({
    videos,
}) => {

    const router = useRouter();

    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='flex flex-col gap-10 videos h-full'>

        <div className='text-xl mt-2 font-normal w-full text-center'>
            <b>{videos.length}</b> result{videos.length > 1 ? "s" : ""} for search value: <b>{router.query.searchValue}</b>
        </div>
        {
          videos.length > 0 ?
  
          videos.map((video, index) => {
            
            return (
              <VideoCard
                key={`main_content_video_card_${video._id}_${index}`}
                post={video}
              />
            )
          })
        :
          <NoResults text="No Videos"/>
        } 
      </div>
    );
};

export default memo(SearchPage);

