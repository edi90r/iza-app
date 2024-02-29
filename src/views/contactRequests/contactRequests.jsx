import propTypes from 'prop-types';
import Wrapper from '../../components/atoms/sectionWrapper/Wrapper';
import NavButton from '../../components/atoms/navButton/navButton';
import ActionButton from '../../components/atoms/actionButton/ActionButton';
import ActionIcon from '../../components/atoms/actionIcon/ActionIcon';
import { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useReportSubmitted } from '../../utils/hooks';
import { sendContactRequestReport } from '../../controlers/user';

const ContactRequests = ({ refs, isScrolling, handleClick }) => {
    const {
        checkMoodIsSubmitted,
        checkUnresolvedRequests,
        moodSubmitted,
        isPossible,
        setIsPossible,
    } = useReportSubmitted();
    const { setModalState, modalState } = useStore();
    let delay;

    const handleContactRequest = async (action) => {
        await checkUnresolvedRequests();

        if (!moodSubmitted) {
            setModalState({
                showModal: true,
                controlers: false,
                content: {
                    title: 'Błąd',
                    message:
                        'Żeby wysłać prośbę kontaktu, musisz najpierw wysłać raport na dzisiaj',
                },
                confirmed: false,
                isLoading: false,
                action: '',
            });

            return;
        } else if (!isPossible) {
            setModalState({
                showModal: true,
                controlers: false,
                content: {
                    title: 'Uwaga',
                    message:
                        'Żeby wysłać prośbę kontaktu, musisz poczekać aż poprzednia zostanie rozwiązana',
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
                title: 'Wysyłanie prośby o kontakt',
            },
            confirmed: false,
            isLoading: true,
            action: '',
        });

        const reported = await sendContactRequestReport(action);
        if (reported.status === 200) {
            console.log('test');
            setModalState({
                showModal: true,
                controlers: false,
                content: {
                    title: 'Wysyłanie prośby o kontakt',
                    message:
                        reported.status === 200
                            ? 'Raport został wysłany pomyślnie!'
                            : 'Wystąpił błąd podczas wysyłania prośby o kontakt',
                },
                confirmed: false,
                isLoading: false,
                action: '',
            });
            setIsPossible(false);
        }
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
    };

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            checkMoodIsSubmitted();
            checkUnresolvedRequests();
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
        <Wrapper
            className='relative flex h-full min-w-full shrink-0 snap-center items-center justify-around'
            sectionRef={refs.contactRequests}
        >
            <NavButton
                className='left-0 rounded-br-lg'
                sectionRef={refs.moods}
                isScrolling={isScrolling}
                onClick={handleClick}
            >
                <ActionIcon action='good' className='h-14 w-14 fill-pureWhite' />
            </NavButton>

            <ActionButton
                className='w-1/3 min-w-44 max-w-xs'
                onClick={() => handleContactRequest('careGiver')}
            >
                <ActionIcon action='careGiver' className='h-full w-full' />
            </ActionButton>

            <ActionButton
                className='w-1/3 min-w-44 max-w-xs'
                onClick={() => handleContactRequest('doctor')}
            >
                <ActionIcon action='doctor' className='h-full w-full' />
            </ActionButton>

            <ActionButton
                className='w-1/3 min-w-44 max-w-xs'
                onClick={() => handleContactRequest('dietician')}
            >
                <ActionIcon action='dietician' className='h-full w-full' />
            </ActionButton>
        </Wrapper>
    );
};

ContactRequests.propTypes = {
    refs: propTypes.object,
    isScrolling: propTypes.bool,
    handleClick: propTypes.func,
};

export default ContactRequests;
