import { useState, useMemo } from 'react';

export const useGlobalState = () => {
    const [currentDay, setCurrentDay] = useState('');

    const [pickedDate, setPickedDate] = useState('');
    const [modalState, setModalState] = useState({
        showModal: false,
        controlers: false,
        isLoading: false,
        action: '',
        content: {},
        lock: false,
    });

    useMemo(() => {
        let isMounted = true;
        if (isMounted) {
            const date = new Date();
            setCurrentDay(date.toISOString().split('T')[0]);
            setPickedDate(date.toISOString().split('T')[0]);
        }
        return () => {
            isMounted = false;
        };
    }, [setCurrentDay]);

    const handleOpenModal = (action, content, controlers) => {
        setModalState({
            action,
            showModal: true,
            controlers,
            content,
            confirmed: false,
            isLoading: false,
        });
    };

    const handleCloseModal = (content, controlers) => {
        setModalState({
            showModal: false,
            controlers,
            content,
            confirmed: false,
            isLoading: false,
        });
    };

    return {
        currentDay,
        setCurrentDay,
        pickedDate,
        setPickedDate,
        modalState,
        setModalState,
        handleOpenModal,
        handleCloseModal,
    };
};
