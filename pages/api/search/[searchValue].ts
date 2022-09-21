import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';

import { client } from '../../../utils/client';
import { searchPostsQuery } from '../../../utils/queries';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

        if(req.method === "GET") {
            const {searchValue} = req.query;

            const data = await client.fetch(searchPostsQuery(searchValue));

            res.status(200).json(data);
        }

    } catch (error) {
        console.log("Error searching videos...", error);
        res.status(404).json({message: error});
    }
};