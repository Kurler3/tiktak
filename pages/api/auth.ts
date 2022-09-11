import type { NextApiRequest, NextApiResponse } from "next";
import {client} from '../../utils/client';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        // IF SAVING USER
        if(req.method === "POST") {
            // GET USER DATA PASSED IN AXIOS REQUEST
            const user = req.body;

            // CREATE USER IF IT DOESN'T EXIST
            client.createIfNotExists(user)
            .then(() => {
                res.status(200).json({message: "Login success!"});
            });

        }    
    } catch (error) {
        console.log("Error saving user...", error);
    }   
    

};
