import { createContext } from 'react';

const initialState = {
    table: {},
    setTable: () => {},
    currentDay: '',
    setCurrentDay: () => {},
};

export const Context = createContext(initialState);
