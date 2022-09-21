import type { NextApiRequest, NextApiResponse } from "next";
import { uuid } from "uuidv4";
import { client } from "../../../utils/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {

        if(req.method === "PUT") {

            const isDelete = req.body.isDelete;

            if(isDelete) {
                const {
                    commentId,
                    postId,
                } = req.body;

                // const data = await client.patch(postId)
                // .unset
            }
            else {
                const {
                    userId,
                    postId,
                    comment,
                } = req.body;
    
                // ADD COMMENT
    
    
                // INSERT IT IN POST
                const data = await client.patch(postId)
                .setIfMissing({comments: []})
                .insert('after', 'comments[-1]', [{
                    comment: comment,
                    _key: uuid(),
                    postedBy: {
                        _ref: userId,
                        _type: "postedBy",
                    },
                }])
                .commit();
    
    
                res.status(200).json(data);
            }
            
        }
        else if(req.method === "DELETE") {

        }

    } catch (error) {
        console.log("Error while liking post....", error);

        // STATUS 500 (server error)
        res.status(500).send("Error while liking post " + error);
    }
}