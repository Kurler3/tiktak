import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {useState, useEffect} from 'react';

// COMPONENTS
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  
  const [isSSR, setisSSR] = useState(true);

  // IF CALL USE EFFECT, THEN IN CLIENT SIDE.
  useEffect(() => {
    setisSSR(false);
  }, []);

  // DONT'T WANT TO SHOW COMPONENTS IF IN SERVER SIDE 
  if(isSSR) return null;

  // NOT IN SERVER-SIDE, SO RENDERING FROM CLIENT --- OK
  return (
    <div>

      {/* NAVBAR */}
      <Navbar />
      
      {/* BODY */}
      <div className='flex gap-6 md:gap-20'>

          {/* SIDE BAR! */}
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} />
          </div>
         
      </div>
    </div>
  )
}

export default MyApp
