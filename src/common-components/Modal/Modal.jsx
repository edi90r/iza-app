import { useEffect, useRef } from 'react';
import { useStore } from '../../admin-panel/store/useStore';
import { useParams, useNavigate } from 'react-router-dom';
import { setSpecificDataShape } from '../../utils/helpers';
import Button from '../../admin-panel/components/Atoms/Button/Button';
import Loader from '../../admin-panel/components/Atoms/Loader/Loader';
import { deleteUser, createUser, updateUser } from '../../controlers/admin';

const Modal = () => {
    const { modalState, setModalState, newUser } = useStore();
    const { content, controlers, isLoading, action } = modalState;
    const { id } = useParams();
    const navigate = useNavigate();

    let delay;

    const modalRef = useRef(null);

    const handleConfirm = async () => {
        switch (action) {
            case 'delete': {
                setModalState((prevState) => ({ ...prevState, isLoading: true }));
                const response = await deleteUser(id);

                if (response.status === 200) {
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Usuwanie użytkownika',
                            message: 'Użytownik został usunięty pomyślnie!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
                } else if (response.status !== 200 || !response) {
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Usuwanie użytkownika',
                            message:
                                'Wystąpił błąd podczas usuwania użytkownika, użytkownik nie został usunięty!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
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
                    navigate('/admin');
                }, 2000);
                return;
            }
            case 'addUser': {
                setModalState((prevState) => ({ ...prevState, isLoading: true }));
                const user = setSpecificDataShape(newUser, 'newUser');
                const response = await createUser(user);

                if (!response || response.status !== 200) {
                    if (response.status === 409) {
                        setModalState({
                            showModal: true,
                            controlers: false,
                            content: {
                                title: 'Dodawnie użytkownika',
                                message: 'Użytkownik o podanym adresie email już istnieje.',
                            },
                            confirmed: false,
                            loading: false,
                            action: '',
                        });

                        delay = setTimeout(() => {
                            setModalState({
                                ...modalState,
                                showModal: false,
                                content: {
                                    title: '',
                                    message: '',
                                },
                            });
                        }, 2000);
                        return;
                    }
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Dodawnie użytkownika',
                            message:
                                'Wystąpił błąd podczas dodawnia użytkownika, użytkownik nie został dodany!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
                } else if (response.status === 200) {
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Dodawanie użytkownika',
                            message: 'Użytownik został dodany pomyślnie!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
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
                    navigate('/admin');
                }, 2000);
                return;
            }
            case 'editUser': {
                setModalState((prevState) => ({ ...prevState, isLoading: true }));
                const user = setSpecificDataShape(newUser, 'editUser');
                const response = await updateUser(id, user);

                if (response.status !== 200 || !response) {
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Edytowanie użytkownika',
                            message:
                                'Wystąpił błąd podczas edytowania użytkownika, użytkownik nie został edytowany!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
                } else if (response.status === 200) {
                    setModalState({
                        showModal: true,
                        controlers: false,
                        content: {
                            title: 'Edytowanie użytkownika',
                            message: 'Użytownik został edytowany pomyślnie!',
                        },
                        confirmed: false,
                        loading: false,
                        action: '',
                    });
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
                    navigate('/admin');
                }, 2000);
                return;
            }
            default:
                return;
        }
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
