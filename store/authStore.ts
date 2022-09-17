import create from 'zustand';
// GONNA USE THIS SO THAT THE STATE REMAINS EVEN AFTER RELOADING THE PAGE (INSTEAD OF USING LOCAL STORAGE)
import {persist} from 'zustand/middleware';
import { IUser } from '../types';
import axios from 'axios';

import {BASE_URL} from '../utils/constants';

interface IAuth {
    userProfile: IUser | null;
    allUsers: IUser[] | null;
    addUser: any;
    logout: any;
    fetchAllUsers: any;
};

// INIT AUTH STORE
const authStore = (set:any):IAuth => ({
    userProfile: null,
    allUsers: null,

    // ADD USER TO STATE METHOD
    addUser: (user:any) => set({userProfile: user}),

    // LOGOUT USER
    logout: () => set({userProfile: null}),

    // FETCH ALL USERS
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);

        set({
            allUsers: response.data,
        });
    },
});

// WILL BE CALLED AS A HOOK THAT CAN BE CALLED FROM ANY COMPONENT
const useAuthStore = create(
    // WRAP AUTH STORE IN PERSIST
    persist(
        authStore,
        {
            name: "auth",
        }
    ),
);

export default useAuthStore;