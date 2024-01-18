import { useState, useMemo } from 'react';

export const useGlobalState = () => {
    const [table, setTable] = useState({ mode: 'oneDay', active: true });
    const [currentDay, setCurrentDay] = useState('');

    useMemo(() => {
        const date = new Date();

        setCurrentDay(date.toISOString().split('T')[0]);
    }, [setCurrentDay]);

    return {
        table,
        setTable,
        currentDay,
        setCurrentDay,
    };
};
