import type { NextApiRequest, NextApiResponse } from "next";
import {client} from '../../utils/client';
import {
    allUsersQuery
} from '../../utils/queries';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        
        if(req.method === "GET") {

            const query = allUsersQuery();
            // GET USERS
            const {data} = await client.fetch(
                query
            );

            res.status(200).json(data);

        }


    } catch (error) {
        console.log("Error fetching all users...", error);
        res.status(500).send(error);
    }
}