import React,{memo, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai';
import {ImCancelCircle} from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import SidebarFooter from './SidebarFooter';


const Sidebar = () => {

  const [showSideBar, setShowSideBar] = useState(true);

  const userProfile = false;


  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center cursor-pointer xl:justify-start font-semibold text-[#F51997] rounded';

  return (
    <div>   
        {/* SIDE BAR SHOW BTN (ONLY FOR MOBILE DEVICES) */}
        <div className="block xl:hidden m-2 ml-4 mt-3 text-xl"
            onClick={() => setShowSideBar((prevShowSideBar) => !prevShowSideBar)}
        >
            {
                showSideBar ?
                <ImCancelCircle />
                :
                <AiOutlineMenu />
            }
        </div>

        {/* SIDE BAR */}
        {
            showSideBar && (
                <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">

                    {/* FOR YOU (HOME LINK) */}
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                        <Link href="/">
                            <div className={normalLink}>
                                <p className='text-2xl'>
                                    <AiFillHome />
                                </p>
                                <span className="text-xl hidden xl:block">
                                    For You
                                </span>
                            </div>
                        </Link>
                    </div>

                    {
                        !userProfile && (
                            <div className="px-2 py-4 hidden xl:block">
                                <p
                                    className="text-gray-400 "    
                                >
                                    Log in to like and comment on videos
                                </p>

                                <div className="pr-4">
                                    <GoogleLogin 
                                        clientId=''
                                        onSuccess={() => {}}
                                        onFailure={() => {}}
                                        cookiePolicy="single_host_origin"
                                        
                                        // CUSTOM STYLING
                                        render={(renderProps) => (
                                            
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="
                                                bg-white text-lg text-[#F51997]
                                                border-[1px] border-[#F51997] 
                                                font-semibold px-6 py-3 rounded-md outline-noen w-full mt-3 hover:text-white cursor-pointer
                                                hover:bg-[#F51997] transition-all
                                                "   
                                            >
                                                Log in
                                            </button>
                                        )}
                                    />
                                </div>
                            </div>
                        )
                    }

                    {/* DISCOVER CATEGORIES */}
                    <Discover />

                    {/* SUGGESTED */}
                    <SuggestedAccounts />
                    
                    {/* SIDEBAR FOOTER */}
                    <SidebarFooter />


                </div>
            )
        }

    </div>
  )
}

export default memo(Sidebar);