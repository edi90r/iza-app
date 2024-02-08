import { useRef } from 'react';
import { useScrollPosition } from '../utils/hooks';
import ActionIcon from '../common-components/ActionIcon/ActionIcon';

const PwaApp = () => {
    const containerRef = useRef(null);
    const moodsRef = useRef(null);
    const contactsRef = useRef(null);

    const [scrollPosition, isScrolling] = useScrollPosition(containerRef);

    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className='pwa relative flex h-screen w-auto snap-x snap-mandatory overflow-x-scroll'
            ref={containerRef}
        >
            <div
                className={`absolute ${
                    scrollPosition === 0 ? 'right-0 rounded-bl-lg' : '-right-32 rounded-br-lg'
                } ${
                    isScrolling ? 'opacity-0' : 'opacity-100'
                } top-0 flex h-32 w-32 items-center justify-center bg-primary transition-opacity duration-200 ease-in-out`}
                onClick={() => handleClick(scrollPosition === 0 ? contactsRef : moodsRef)}
            >
                {scrollPosition === 0 && (
                    <ActionIcon action='contactRequest' className='h-14 w-14 fill-pureWhite' />
                )}
                {scrollPosition === 1 && (
                    <ActionIcon action='good' className='h-14 w-14 fill-pureWhite' />
                )}
            </div>

            <div
                className='m-0 flex h-full min-w-full shrink-0 snap-center items-center justify-around'
                ref={moodsRef}
            >
                <ActionIcon action='good' className='h-80 w-80' />
                <ActionIcon action='average' className='h-80 w-80' />
                <ActionIcon action='bad' className='h-80 w-80' />
            </div>

            <div
                className='bg-blue flex h-full min-w-full shrink-0 snap-center items-center justify-around'
                ref={contactsRef}
            >
                <ActionIcon action='careGiver' className='h-80 w-80' />
                <ActionIcon action='doctor' className='h-80 w-80' />
                <ActionIcon action='dietician' className='h-80 w-80' />
            </div>

            <div className='join fixed bottom-4 left-1/2 -translate-x-1/2'>
                <input
                    className='btn btn-square join-item'
                    type='radio'
                    name='options'
                    aria-label='1'
                    checked={scrollPosition === 0 ? true : false}
                    onClick={() => handleClick(moodsRef)}
                    readOnly
                />
                <input
                    className='btn btn-square join-item'
                    type='radio'
                    name='options'
                    aria-label='2'
                    checked={scrollPosition === 1 ? true : false}
                    onClick={() => handleClick(contactsRef)}
                    readOnly
                />
            </div>
        </div>
    );
};

export default PwaApp;
