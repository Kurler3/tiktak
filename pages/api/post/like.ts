import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        
    } catch (error) {
        console.log("Error while liking post....", error);

        // STATUS 500 (server error)
        res.status(500).send("Error while liking post " + error);
    }
}