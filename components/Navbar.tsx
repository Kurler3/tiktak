import React, {memo, SyntheticEvent, useCallback, useState} from 'react';
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

  // INIT ROUTER
  const router = useRouter();

  const {userProfile, addUser, logout} = useAuthStore();

  const [state, setState] = useState({
    searchValue: '',
  });

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

 // HANDLE SEARCH
  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // CHECK IF SEARCH VALUE IS NOT EMPTY
    if(state.searchValue!=="") {

      // PUSH TO SEARCH PAGE!
      router.push(`/search/${state.searchValue}`);

    }
  }, [router, state.searchValue]);


  // HANDLE CHANGE IN SEARCH BAR
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => {
      return {
        ...prevState,
        searchValue: e.target.value,
      }
    });
  }, []);

  //////////////
  // RENDER  ///
  //////////////
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">

        {/* LOGO LINK */}
        <Link href="/">
            <div className='text-[#F51997] text-[40px] font-bold italic cursor-pointer transition hover:scale-[1.03]'>
              TikTak
            </div>
        </Link>

         
        {/* SEARCH FORM */}
        <div className='relative hidden md:block'>
          <form 
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20 bg-white"
          >
            <input 
              type="text"
              value={state.searchValue}
              onChange={handleSearchChange}
              placeholder="Search accounts and videos"
              className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 
              focus:outline-none 
              focus:border-2
              focus:border-gray-300
              transition
              w-[300px]
              md:w-[350px]
              rounded-full
              md:top-0
              '
            />

            <button type="submit"
              className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
            >
              <BiSearch />
            </button>


          </form>
        </div>

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
                // REDIRECT TO HOME PAGE
                router.push("/");
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