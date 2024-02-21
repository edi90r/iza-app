import { createContext } from 'react';

const initialState = {
    table: {},
    setTable: () => {},
    currentDay: '',
    setCurrentDay: () => {},
    pickedDate: '',
    setPickedDate: () => {},
    newUser: {},
    setNewUser: () => {},
    modalState: {},
    setModalState: () => {},
    handleOpenModal: () => {},
    handleCloseModal: () => {},
};

export const Context = createContext(initialState);
