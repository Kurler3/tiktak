// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { allPostsQuery } from '../../../utils/queries'
import {client} from '../../../utils/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // FETCH All POSTS
    if(req.method === "GET") {
      // QUERY
      const query = allPostsQuery();

      // REQUEST DATA FROM THE SANITY CLIENT
      const data = await client.fetch(query);

      res.status(200).json(data);
    } 
    // WHEN SAVING A NEW POST!
    else if(req.method === "POST") {

      // GET NEW DOC DATA FROM THE REQUEST BODY :)))
      const newDoc = req.body;

      // SAVE USING THE SANITY CLIENT 
      client.create(
        newDoc,
      )
      // RETURN STATUS 201 (stands for created) INSTEAD OF 200 (ok)
      .then(() => res.status(201).json({
          message: "Video created!",
        })
      );  

    }

  } catch (error) {

  } 
}
