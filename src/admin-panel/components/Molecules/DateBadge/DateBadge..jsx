import { useStore } from '../../../store/useStore';

const DateBadge = () => {
    const { currentDay } = useStore();
    return (
        <div className='shadow-xs badge badge-md me-4 flex w-44 justify-between p-4 font-montserrat text-base hover:cursor-default'>
            <div className='text-gray-50'>Data</div>
            <div className='font-700'>{currentDay}</div>
        </div>
    );
};

export default DateBadge;
