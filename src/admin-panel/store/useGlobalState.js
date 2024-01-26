import { useState, useMemo } from 'react';

export const useGlobalState = () => {
    const [table, setTable] = useState({ mode: 'oneDay', active: true });
    const [currentDay, setCurrentDay] = useState('');
    const [pickedDate, setPickedDate] = useState('');

    useMemo(() => {
        const date = new Date();

        setCurrentDay(date.toISOString().split('T')[0]);
        setPickedDate(date.toISOString().split('T')[0]);
    }, [setCurrentDay]);

    return {
        table,
        setTable,
        currentDay,
        setCurrentDay,
        pickedDate,
        setPickedDate,
    };
};
