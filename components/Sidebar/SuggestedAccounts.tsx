import React, { memo, useEffect } from 'react'
import useAuthStore from '../../store/authStore';
import { AiOutlineLoading } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';

/////////////////////////
// SUGGESTED ACCOUNTS ///
/////////////////////////

const SuggestedAccounts = () => {

  const router = useRouter();

  // FROM ZUSTAND AUTH STORE!
  const { allUsers, fetchAllUsers } = useAuthStore();


  // FETCH ALL USERS
  useEffect(() => {
    // IF HASN'T FETCHED ALL USERS YET, THEN FETCH'EM :D
    if (!allUsers) {
      fetchAllUsers();
    }
  }, [allUsers, fetchAllUsers]);

  ////////////////
  // RENDER //////
  ////////////////

  return (
    <div className='mt-5 pb-5 border-b-2 border-gray-200'>
      {
        allUsers ?

          allUsers.length > 0 ?

            <div className='flex flex-col justify-start items-start w-full gap-4'>
              {
                allUsers.map((user, index) => {
                  return (
                    <div
                      key={`suggested_account_${user._id}_${index}`}
                      className="flex justify-between items-center gap-4 cursor-pointer hover:bg-gray-200 w-full p-2 rounded-md hover:shadow-xl transition"
                      onClick={() => router.push(`/user/${user._id}`)}
                    >
                      <div className='flex justify-start items-center gap-2'>
                        {/* USER PROFILE IMAGE */}
                        <div className='md:w-15 md:h-15 w-12 h-12'>
                          <Link href={`/user/${user._id}`}>
                            <>
                              <Image
                                width={25}
                                height={25}
                                className="rounded-full"
                                src={user.image}
                                alt="Profile pic"
                                layout="responsive"
                              />
                            </>
                          </Link>
                        </div>


                        <span
                          className='text-md font-semibold'
                        >
                          {user.userName}
                        </span>
                      </div>


                      <span className='mr-2'>
                        <GoVerified className="text-blue-400" />
                      </span>

                    </div>
                  )
                })
              }
            </div>
            :
            <div className='text-center font-semibold text-md'>No users yet</div>
          :
          <div className='w-full flex justify-center items-center'>

            <span
              className='font-medium text-md'
            >
              Searching for users...
            </span>

            <AiOutlineLoading className='rotating ml-3' fontSize={40} color="blue" />
          </div>
      }
    </div>
  );
};

export default memo(SuggestedAccounts);