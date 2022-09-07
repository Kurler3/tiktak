import React, {memo, useMemo} from 'react';

import Link from 'next/link';
import {useRouter} from 'next/router';

import {topics} from '../../utils/constants';

const Discover = () => {

  // USE ROUTER
  const router = useRouter();

  // GET TOPIC FROM URL
  const {topic} = router.query;

  // ACTIVE TOPIC STYLE MEMO
  const activeTopicStyle = useMemo(() => "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]", []);

  // NORMAL TOPIC STYLE MEMO
  const topicStyle = useMemo(() => "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black", []);

  // RENDER DISCOVER COMPONENT
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>

        {/* DISCOVER COMPONENT TITLE */}
        <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
          Popular Topics
        </p>

        {/* TOPICS CONTAINER */}
        <div className="flex gap-3 flex-wrap">
            {
              topics.map((item, index) => (
                // TOPIC
                <Link href={`/?topic=${item.name}`} key={`sidebar_discover_topic_${item.name}_${index}`}>
                  <div className={topic === item.name ? activeTopicStyle : topicStyle}>
                    {/* ICON */}
                    <span className="font-bold text-2xl xl:text-md">
                      {item.icon}
                    </span>
                    {/* NAME */}
                    <span className="font-medium text-md hidden xl:block capitalize">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))
            }
        </div>

    </div>
  )
}

export default memo(Discover);