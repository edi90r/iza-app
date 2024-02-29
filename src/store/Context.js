import { createContext } from 'react';

const initialState = {
    currentDay: '',
    setCurrentDay: () => {},
    pickedDate: '',
    setPickedDate: () => {},
    modalState: {},
    setModalState: () => {},
    handleOpenModal: () => {},
    handleCloseModal: () => {},
};

export const Context = createContext(initialState);
