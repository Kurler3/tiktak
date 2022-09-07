// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { allPostsQuery } from '../../../utils/queries'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // FETCH All POSTS
    if(req.method === "GET") {
        // QUERY
        const query = allPostsQuery();

        // REQUEST DATA FROM THE SANITY CLIENT
    }
}
