import React, {memo, useCallback} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';
import Logo from '../utils/tiktik-logo.png';
import {CredentialResponse, GoogleLogin, googleLogout} from '@react-oauth/google';
import { createOrGetUser } from '../utils';
import useAuthStore from '../store/authStore';


const Navbar = () => {

  const {userProfile, addUser, logout} = useAuthStore();

  //////////////
  // FUNCTIONS//
  //////////////

  // ON SUCCESS GOOGLE LOGIN
  const onSuccessGoogle = useCallback((res:CredentialResponse) => {
    createOrGetUser(res, addUser);
  }, [addUser]);

  // ON ERROR GOOGLE LOGIN
  const onErrorGoogle = useCallback(() => {
    console.log('Error Google');
  }, []);


  //////////////
  // RENDER  ///
  //////////////
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">

        {/* LOGO LINK */}
        <Link href="/">
            <div className="w-[100px] md:w-[130px]">
                <Image 
                    className='cursor-pointer'
                    src={Logo}
                    alt="TikTak"
                    layout="responsive"
                />
            </div>
        </Link>

         
        {/* SEARCH FORM */}
        <div>Search!</div>

        {/* LOGIN/LOGOUT */}
        {
          userProfile ?
         (
          <div className='flex gap-5 md:gap-10'>
            {/* LINK TO UPLOAD POST */}
            <Link href='/upload'>
               <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                  <IoMdAdd className='text-xl'/> {` `}
                  <span className='hidden md:block'>Upload</span>
               </button>
            </Link>

            {/* IMAGE */}
            {
              userProfile.image && (
                
                <Link href={`/user/${userProfile.userName}`}>
                  <>
                    <Image 
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="profile pic"
                     
                    />
                  </>
                </Link>
              )
            }

            {/* LOGOUT BTN! */}
            <button
              className="px-2 shadow-md border-gray-300 rounded-full border hover:scale-[1.1] transition"
              onClick={() => {
                // GOOGLE LOGOUT
                googleLogout();
                // STATE LOGOUT
                logout();
              }}
            >
              <AiOutlineLogout fontSize={22} className="text-red-600"/>
            </button>

          </div>
          )
          :
          <GoogleLogin 
            onSuccess={onSuccessGoogle}
            onError={onErrorGoogle}
          />
        }
    </div>
  )
}

export default memo(Navbar);