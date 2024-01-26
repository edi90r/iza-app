import { createContext } from 'react';

const initialState = {
    table: {},
    setTable: () => {},
    currentDay: '',
    setCurrentDay: () => {},
    pickedDate: '',
    setPickedDate: () => {},
};

export const Context = createContext(initialState);
