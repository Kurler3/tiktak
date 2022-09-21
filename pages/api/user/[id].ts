import type { NextApiRequest, NextApiResponse } from "next";

import {client} from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "../../../utils/queries";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

       if(req.method === "GET") {
        const {id} = req.query;

        // GET USER DATA
        const userData = await client.fetch(singleUserQuery(id));
        // GET USER CREATED POSTS
        const createdPosts = await client.fetch(userCreatedPostsQuery(id));
        // GET USER LIKED POSTS
        const likedPosts = await client.fetch(userLikedPostsQuery(id));

        res.status(200).json({
            userData: userData[0],
            createdPosts,
            likedPosts,
        });
       }

    } catch (error) {
        console.log("Error handling specific user data...", error);
        res.status(404).json(error);
    }
}
