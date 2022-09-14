// NEXT REQUEST + RESPONSE TYPES
import type { NextApiRequest, NextApiResponse } from "next";

// SANITY CLIENT
import {client} from '../../../utils/client';
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // IF FETCHING DETAILS 
        if(req.method === 'GET') {
            
            // GET ID OF POST
            // CAN DO THIS USING NEXT JS
            const {id} = req.query;

            // QUERY
            const query = postDetailQuery(id);

            // PASS THE QUERY TO THE SANITY CLIENT
            const data = await client.fetch(query);

            // RETURN THE DATA AS JSON + SET STATUS TO 200 ---- OK
            res.status(200).json(data);
        }
        


    } catch (error) {
        console.log("Error handling specific post details request...", error);
    }
}