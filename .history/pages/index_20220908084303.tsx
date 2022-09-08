import type { NextPage } from 'next';
import axios from 'axios';

// VIDEO TYPE
import { Video } from '../types';


interface Iprops { 
  videos: Video[]; 
}

const Home: NextPage<Iprops> = ({ videos }) => {

  console.log(videos)

  
  return (
    <div className='flex flex-col gap-10 videos h-full'>

    </div>
  )
}

// FETCH MAIN CONTENT
export const getServerSideProps = async () => {

  const {data} = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data,
    }
  }
}

export default Home
