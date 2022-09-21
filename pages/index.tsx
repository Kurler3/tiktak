import type { NextPage } from 'next';
import axios from 'axios';

// VIDEO TYPE
import { Video } from '../types';
import VideoCard from '../components/MainContentComponents/VideoCard';
import NoResults from '../components/MainContentComponents/NoResults';
import { BASE_URL } from '../utils/constants';


interface Iprops { 
  videos: Video[]; 
}

const Home: NextPage<Iprops> = ({ videos }) => {


  return (
    <div className='flex flex-col gap-10 videos h-full'>
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
  )
}

// FETCH MAIN CONTENT
export const getServerSideProps = async () => {

  const {data} = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data,
    }
  }
}

export default Home
