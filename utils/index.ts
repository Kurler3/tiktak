import { CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GoogleDecodedToken } from '../types';
import { BASE_URL } from './constants';

export const createOrGetUser = async (response: CredentialResponse, addUser: any) => {
  const decoded: GoogleDecodedToken = jwt_decode(response.credential!);
  
  // DESTRUCTURE PROPERTIES OF DECODED TOKEN
  const {name, picture, sub } = decoded;

  // ADD NEW USER TO SANITY DB
  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };
  // MAKE API CALL TO OWN BACK-END
  await axios.post(`${BASE_URL}/api/auth`, user); 

  // API CALL ----- OK
  // ADD TO STATE
  addUser(user);
};