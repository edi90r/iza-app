import { useEffect, useRef } from 'react';
import { useStore } from '../../../store/useStore';
import Button from '../../atoms/button/Button';
import Loader from '../../atoms/loader/Loader';

const Modal = () => {
    const { modalState, setModalState } = useStore();
    const { content, controlers, isLoading } = modalState;

    let delay;

    const modalRef = useRef(null);

    const handleConfirm = async (e) => {
        console.log(e.currentTarget);
    };

    useEffect(() => {
        if (modalState.showModal) {
            modalRef.current.showModal();
            return;
        }

        if (delay) {
            clearTimeout(delay);
        }
        modalRef.current.close();
    }, [modalState, delay]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isLoading && event.key === 'Escape') {
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLoading]);

    return (
        <dialog id='my_modal_2' className='modal' ref={modalRef}>
            <div className='modal-box'>
                <h3 className='text-lg font-bold'>{content?.title}</h3>

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <p className='py-4'>{content?.message}</p>
                        {controlers && (
                            <div className='flex items-center justify-between'>
                                <Button
                                    onClick={() => {
                                        setModalState({
                                            ...modalState,
                                            showModal: false,
                                            confirmed: false,
                                        });
                                    }}
                                    variant='error'
                                    outline
                                >
                                    Nie
                                </Button>
                                <Button onClick={() => handleConfirm()} variant='success'>
                                    Tak
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button
                    disabled={isLoading}
                    onClick={() => {
                        setModalState({ ...modalState, showModal: false, confirmed: false });
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

export default Modal;
