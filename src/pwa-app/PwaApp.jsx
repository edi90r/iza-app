import { useRef } from 'react';
import { useScrollPosition } from '../utils/hooks';
import ActionIcon from '../common-components/ActionIcon/ActionIcon';
import ActionButton from './components/Molecules/ActionButton/ActionButton';
import { sendReport, sendContactRequestReport } from './controlers/user';
import { useReportSubmitted } from '../utils/hooks';

const PwaApp = () => {
    const containerRef = useRef(null);
    const moodsRef = useRef(null);
    const contactsRef = useRef(null);
    const [moodSubmitted, setMoodSubmitted, isPossible, setIsPossible] = useReportSubmitted();
    const [scrollPosition, isScrolling] = useScrollPosition(containerRef);

    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleReport = async (action) => {
        if (moodSubmitted) {
            console.log('Wysłałeś już raport dzisiaj');
            return;
        }
        const reported = await sendReport(action);
        reported.status === 200 && setMoodSubmitted(true);
    };

    const handleContactRequest = async (action) => {
        if (!moodSubmitted) {
            console.log('Żeby wysłać prośbę kontaktu, musisz najpierw wysłać raport na dzisiaj');
            return;
        }
        if (!isPossible) {
            console.log(
                'Nie możesz wysłać prośby kontaktu,dopóki poprzednia nie zostanie zakończona',
            );
            return;
        }
        const reported = await sendContactRequestReport(action);
        reported.status === 200 && setIsPossible(false);
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
                <ActionButton className='h-80 w-80' onClick={() => handleReport('good')}>
                    <ActionIcon action='good' className='h-full w-full' />
                </ActionButton>
                <ActionButton className='h-80 w-80' onClick={() => handleReport('average')}>
                    <ActionIcon action='average' className='h-full w-full' />
                </ActionButton>
                <ActionButton className='h-80 w-80' onClick={() => handleReport('bad')}>
                    <ActionIcon action='bad' className='h-full w-full' />
                </ActionButton>
            </div>

            <div
                className='bg-blue flex h-full min-w-full shrink-0 snap-center items-center justify-around'
                ref={contactsRef}
            >
                <ActionButton
                    className='h-80 w-80'
                    onClick={() => handleContactRequest('careGiver')}
                >
                    <ActionIcon action='careGiver' className='h-full w-full' />
                </ActionButton>
                <ActionButton className='h-80 w-80' onClick={() => handleContactRequest('doctor')}>
                    <ActionIcon action='doctor' className='h-full w-full' />
                </ActionButton>
                <ActionButton
                    className='h-80 w-80'
                    onClick={() => handleContactRequest('dietician')}
                >
                    <ActionIcon action='dietician' className='h-full w-full' />
                </ActionButton>
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
