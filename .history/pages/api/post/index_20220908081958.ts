// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { allPostsQuery } from '../../../utils/queries'
import {client} from '../../../utils/client';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    // FETCH All POSTS
    if(req.method === "GET") {
        // QUERY
        const query = allPostsQuery();

        // REQUEST DATA FROM THE SANITY CLIENT
        const data = await client.fetch(query);

        res.status(200).json(data);
    }
}
