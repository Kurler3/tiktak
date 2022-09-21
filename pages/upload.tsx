import React, {memo, useEffect, useState, useCallback} from 'react';
import {useRouter} from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import {client} from '../utils/client';
import { BASE_URL, FILE_TYPES_AVAILABLE } from '../utils/constants';
import { SanityAssetDocument } from '@sanity/client';
import {topics} from '../utils/constants';

interface IState {
    isLoading: boolean;
    videoAsset: SanityAssetDocument | null;
    isWrongFileType: boolean;
    captionText: string;
    category: string;
    isSavingPost: boolean;
}

//////////////////////
// UPLOAD COMPONENT///
//////////////////////

const Upload = () => {

    // UPLOAD BTN STYLE
    const disabledUploadBtnStyle = "bg-[#F51997] opacity-40 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none";

    const normalUploadBtnStyle = "bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:scale-[1.1] transition";


    // INIT ROUTER
    const router = useRouter();

    //////////////
    // STATE  ////
    //////////////

    const [state, setState] = useState<IState>({
        isLoading: false,
        videoAsset: null,
        isWrongFileType: false,
        captionText: '',
        category: topics[0].name,
        isSavingPost: false,
    });

    // GET USER FROM ZUSTAND
    const {userProfile} = useAuthStore();

    //////////////////
    // FUNCTIONS  ////
    //////////////////

    const uploadVideo = useCallback(async (e: any) => {
        // GET FILE SELECTED
        const selectedFile = e.target.files[0];
        
        // CHECK IF SELECTED FILE TYPE IS IN THE AVAILABLE FILE TYPES
        let isTypeValid = FILE_TYPES_AVAILABLE.includes(selectedFile.type);

        // IF VALID
        if(isTypeValid) {

            // UPLOAD TO CLIENTS ASSETS
            const videoAsset = await client.assets.upload(
                // TYPE OF ASSET
                "file",
                // FILE ITSELF
                selectedFile,
                // OPTIONS
                {
                    // TYPE OF THE CONTENT OF THE FILE
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                }
            );

            setState((prevState) => {
                return {
                    ...prevState,
                    videoAsset: videoAsset,
                    isLoading: false,
                    isWrongFileType: false,
                }
            });


        }
        else {
            // LOADING TO FALSE + WRONG FILE TYPE
            setState((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                isWrongFileType: true,
              }      
            });
        }

    }, []);


    const handlePost = useCallback(async () => {

        try {
            
            const isCaptionFilled = state.captionText !== "";

            const isVideoSelected = state.videoAsset?._id !== null;
    
            if(isCaptionFilled && isVideoSelected) {
                //  CONTINUE SAVING
                
                // SET SAVING POST TO TRUE
                setState((prevState) => ({...prevState, isSavingPost: true}));
    
                // FORM NEW DOC TO SAVE IN SANITY
                const newDoc = {
                    _type: "post",
                    caption: state.captionText,
                    video: {
                        // TYPE OF THE VIDEO PROPERTY
                        _type: 'file',
                        // ASSET REFERENCES TO THE VIDEO UPLOADED TO SANITY ASSETS
                        asset: {
                            // TYPE OF THE ASSET PROPERTY OF THE VIDEO PROPERTY
                            _type: "reference",
                            // REFERS TO THE VIDEO UPLOADED PREVIOUSLY
                            _ref: state.videoAsset?._id,
                        },
                    },
                    // USER ID OF THE PERSON THAT CREATED THIS POST
                    userId: userProfile?._id,
                    // REFERENCE TOT THE USER DOCUMENT
                    postedBy: {
                        _type: 'postedBy',
                        _ref: userProfile?._id,
                    },
                    // LIKES ARRAY (initially emptyA)
                    likes: [],
                    // COMMENTS ARRAY (initially empty)
                    comments: [],
                    // TOPIC 
                    topic: state.category,
                };
    
                // CALL OWN BACK-END ROUTE!
                await axios.post( 
                    // URL
                    `${BASE_URL}/api/post`,
                    // DATA
                    newDoc,
                );
                    
                // SET NOT SAVING ANYMORE
                setState((prevState) => {
                    return {
                        ...prevState,
                        isSavingPost: false,
                    }
                });

                // REDIRECT BACK TO HOMEPAGE
                router.push("/");
            }

        } catch (error) {
            console.log("Error while saving post....", error);
        }

    }, [router, state.captionText, state.category, state.videoAsset?._id, userProfile?._id]);


    //////////////
    // RENDER ////
    //////////////

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>

            {/*  */}
            <div 
                className='bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-around items-center p-14 pt-6 w-[60%]'
            >

                {/* WRAPPER DIV*/}
                <div>

                    <div>

                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>

                    </div>

                    {/* UPLOAD VIDEO SPACE */}
                    <div 
                        className='border-dashed rounded-xl border-4 border-gray-200 
                        flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] 
                        p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition relative
                        '
                    >
                        {
                            state.isLoading ?
                            (<p>Uploading...</p>)
                            :
                            (
                                <div>
                                    {
                                        state.videoAsset ?
                                        (
                                            <div className='h-[440px] w-[230px]'>
                                                <video
                                                    src={state.videoAsset.url}
                                                    loop
                                                    controls
                                                    className='rounded-xl bg-black h-full w-full'
                                                >

                                                </video>
                                            </div>
                                        )
                                        :
                                        (
                                            <label className='cursor-pointer'>
                                                <div className='flex flex-col items-center justify-center h-full'>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='font-bold text-xl'>
                                                            <FaCloudUploadAlt className="text-gray-300 text-6xl"/>
                                                        </p>
                                                        <p className='text-xl font-semibold text-center mt-2'>
                                                            Upload video
                                                        </p>
                                                    </div>
                                                    <p className='text-gray-400 text-center mt-10 text-sm leading-10'>
                                                        MP4 or WebM or ogg <br />
                                                        720-x1280 or higher <br />
                                                        Up to 10 minutes <br />
                                                        Less tahn 2GB
                                                    </p>
                                                    <p className='bg-[#F51997] text-center mt-10 rounded text-white txt-md font-medium p-2 w-52 outline-none'>
                                                        Select File
                                                    </p>
                                                </div>

                                                <input 
                                                    type="file"
                                                    name="upload-video"
                                                    onChange={uploadVideo}
                                                    className='w-0 h-0'
                                                />

                                            </label>
                                        )
                                    }
                                </div>
                            )   
                        }

                        {/* IF WRONG FILE TYPE ERROR */}
                        {
                            state.isWrongFileType === true && (
                                <p className='text-center text-md absolute bottom-[-35px] text-red-400 font-semibold w-[250px]'>
                                    Please select a valid video file
                                </p>
                            )
                        }

                    </div>
                

                </div>


                 {/* FORM */}
                <div className='flex flex-col gap-3 pb-10'>
                    <label
                        className='text-md font-medium'
                    >
                        Caption
                    </label>

                    <input 
                        type="text"
                        value={state.captionText}
                        onChange={(e) => setState((prevState) => {
                            return {
                                ...prevState,
                                captionText: e.target.value,
                            }
                        })}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />

                    <label className='text-md font-medium'>
                        Choose a Category
                    </label>
                    
                    <select
                        className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                        onChange={(e) => setState((prevState) => {
                            return {
                                ...prevState,
                                category: e.target.value,
                            }
                        })}
                        value={state.category}
                    >
                        {
                            topics.map((topic, index) => (
                                <option key={`upload_topic_${topic.name}_${index}`}
                                    className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                    value={topic.name}
                                >
                                    {topic.name}
                                </option>
                            ))
                        }
                    </select>    
                    
                    {/* BTNS CONTAINER */}
                    <div
                        className='flex gap-6 mt-10'
                    >
                        {/* DISCARD BTN */}
                        <button
                            onClick={() => {}}
                            type="button"
                            className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none hover:scale-[1.1] transition'
                        >
                            Discard
                        </button>

                        {/* POST BTN */}
                        <button
                            onClick={handlePost}
                            type="button"
                            className={state.videoAsset === null || state.captionText === "" ? disabledUploadBtnStyle : normalUploadBtnStyle}
                            disabled={
                                state.videoAsset === null || state.captionText.length === 0
                            }
                        >
                            Post
                        </button>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default memo(Upload);