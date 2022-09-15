import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../utils/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

        if(req.method === "PUT") {
            const {
                userId,
                postId,
                liking,
            } = req.body;

            const data = liking ? await client
            .patch(postId)
            .setIfMissing({likes: []})
            .insert('after', 'likes[-1]', [
                {
                    _key: uuid(),
                    _ref: userId,
                }
            ])
            .commit() 
            : 
            await client.patch(postId)
            .unset([`likes[_ref=="${userId}"]`])
            .commit();

            // RETURN UPDATED POST
            res.status(200).json(data);
        }


    } catch (error) {
        console.log("Error while liking post....", error);

        // STATUS 500 (server error)
        res.status(500).send("Error while liking post " + error);
    }
}