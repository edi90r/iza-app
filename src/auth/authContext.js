import { createContext } from 'react';
const initialState = {
    user: {},
    isAuthenticated: false,
    signIn: () => {},
    signOut: () => {},
    singUp: () => {},
};
export const authContext = createContext(initialState);
