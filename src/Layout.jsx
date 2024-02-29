import { useEffect, useRef } from 'react';
import { useScrollPosition } from './utils/hooks';
import { useStore } from './store/useStore';
import { useReportSubmitted } from './utils/hooks';
import Modal from './components/molecules/modal/Modal';
import Moods from './views/moods/moods';
import ContactRequests from './views/contactRequests/contactRequests';
import Pagination from './components/molecules/pagination/Pagination';

const PwaApp = () => {
    const containerRef = useRef(null);
    const sectionsRefs = {
        moods: useRef(null),
        contactRequests: useRef(null),
    };

    const { modalState } = useStore();
    const { checkMoodIsSubmitted, checkUnresolvedRequests} =
        useReportSubmitted();
    const [scrollPosition, isScrolling] = useScrollPosition(containerRef);

    let delay;

    const handleClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
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
    });

    useEffect(() => {
        if (delay) {
            clearTimeout(delay);
        }
        return;
    }, [delay]);

    return (
        <>
            <div
                className='pwa relative flex h-screen w-auto snap-x snap-mandatory overflow-x-scroll'
                ref={containerRef}
            >
                <Moods refs={sectionsRefs} isScrolling={isScrolling} handleClick={handleClick} />

                <ContactRequests
                    refs={sectionsRefs}
                    isScrolling={isScrolling}
                    handleClick={handleClick}
                />

                <Pagination
                    refs={sectionsRefs}
                    scrollPosition={scrollPosition}
                    handleClick={handleClick}
                />
            </div>
            {modalState.showModal && <Modal />}
        </>
    );
};

export default PwaApp;
