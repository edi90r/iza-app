import propTypes from 'prop-types';
import Wrapper from '../../components/atoms/sectionWrapper/Wrapper';
import NavButton from '../../components/atoms/navButton/navButton';
import ActionButton from '../../components/atoms/actionButton/ActionButton';
import ActionIcon from '../../components/atoms/actionIcon/ActionIcon';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useReportSubmitted } from '../../utils/hooks';
import { sendReport } from '../../controlers/user';

const Moods = ({ refs, isScrolling, handleClick }) => {
    const { checkMoodIsSubmitted, moodSubmitted, setMoodSubmitted } = useReportSubmitted();
    const { setModalState, modalState } = useStore();
    let delay;

    const handleReport = async (action) => {
        await checkMoodIsSubmitted();

        if (moodSubmitted) {
            setModalState({
                showModal: true,
                controlers: false,
                content: {
                    title: 'Wysyłanie raportu',
                    message: 'Raport na dzisiaj został już wysłany!',
                },
                confirmed: false,
                isLoading: false,
                action: '',
            });
            return;
        }

        setModalState({
            showModal: true,
            controlers: false,
            content: {
                title: 'Wysyłanie raportu',
            },
            confirmed: false,
            isLoading: true,
            action: '',
        });

        const reported = await sendReport(action);

        if (reported.status === 200) {
            setModalState({
                showModal: true,
                controlers: false,
                content: {
                    title: 'Wysyłanie raportu',
                    message:
                        reported.status === 200
                            ? 'Raport został wysłany pomyślnie!'
                            : 'Wystąpił błąd podczas wysyłania raportu',
                },
                confirmed: false,
                isLoading: false,
                action: '',
            });
            setMoodSubmitted(true);

            delay = setTimeout(() => {
                setModalState({
                    ...modalState,
                    showModal: false,
                    content: {
                        title: '',
                        message: '',
                    },
                });
            }, 3000);
        }
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            checkMoodIsSubmitted();
        }
        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (delay) {
            clearTimeout(delay);
        }
        return;
    }, [delay]);

    return (
        <Wrapper className='py-20' sectionRef={refs.moods}>
            <NavButton
                className='right-0 rounded-bl-lg'
                sectionRef={refs.contactRequests}
                isScrolling={isScrolling}
                onClick={handleClick}
            >
                <ActionIcon action='contactRequest' className='h-14 w-14 fill-pureWhite' />
            </NavButton>

            <ActionButton className='w-1/3 min-w-44 max-w-xs' onClick={() => handleReport('good')}>
                <ActionIcon action='good' className='h-full w-full' />
            </ActionButton>

            <ActionButton
                className='w-1/3 min-w-44 max-w-xs'
                onClick={() => {
                    handleReport('average');
                }}
            >
                <ActionIcon action='average' className='h-full w-full' />
            </ActionButton>

            <ActionButton className='w-1/3 min-w-44 max-w-xs' onClick={() => handleReport('bad')}>
                <ActionIcon action='bad' className='h-full w-full' />
            </ActionButton>
        </Wrapper>
    );
};

Moods.propTypes = {
    refs: propTypes.object,
    isScrolling: propTypes.bool,
    handleClick: propTypes.func,
};

export default Moods;
