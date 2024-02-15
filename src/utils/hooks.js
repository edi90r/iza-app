import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import {
    UserPersonalDataSchema,
    UserContactDataSchema,
    UserCredentialsSchema,
    UserDataSummarySchema,
    EditUserSchema,
    ContactRequestNoteSchema,
} from './formValidation';

export const useProvideAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [error, setError] = useState(null);

    const auth = getAuth();

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError({ message: 'Podany email lub hasło jest nieprawidłowy' });
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setIsAuthenticated(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const idTokenResult = await user.getIdTokenResult();
                    const { role } = idTokenResult.claims;
                    if (role) {
                        setIsAuthenticated(true);
                        setUserRole(role);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    return {
        isAuthenticated,
        userRole,
        signIn,
        handleSignOut,
        error,
        setError,
    };
};

export const useAppView = () => {
    const [appView, setAppView] = useState('');
    const [matchObj, setMatchObj] = useState({});
    const { pathname } = useLocation();

    useEffect(() => {
        const routesPattern = [
            {
                pattern: '/admin',
                view: 'dashboard',
            },
            {
                pattern: '/admin/user-details/:id',
                view: 'userDetails',
            },
            {
                pattern: '/admin/add-user/personal-data',
                view: 'addUserPersonalData',
            },
            {
                pattern: '/admin/add-user/contact-data',
                view: 'addUserContactData',
            },
            {
                pattern: '/admin/add-user/register',
                view: 'addUserRegister',
            },
            {
                pattern: '/admin/add-user/summary',
                view: 'addUserSummary',
            },
            {
                pattern: '/admin/user-details/:id/edit',
                view: 'editUser',
            },
            {
                pattern: '/admin/user-details/:id/edit-credentials',
                view: 'editUserCredentials',
            },
        ];

        routesPattern.map((routePattern) => {
            const match = matchPath(routePattern.pattern, pathname);
            return match && (setMatchObj(match), setAppView(routePattern.view));
        });
    }, [pathname, appView]);
    return [appView, matchObj];
};

export const useValidation = (appView) => {
    let schemaValidation = null;
    switch (appView) {
        case 'addUserPersonalData':
            schemaValidation = UserPersonalDataSchema;
            break;
        case 'addUserContactData':
            schemaValidation = UserContactDataSchema;
            break;
        case 'addUserRegister':
        case 'editUserCredentials':
            schemaValidation = UserCredentialsSchema;
            break;
        case 'addUserSummary':
            schemaValidation = UserDataSummarySchema;
            break;
        case 'editUser':
            schemaValidation = EditUserSchema;
            break;
        case 'userDetails':
            schemaValidation = ContactRequestNoteSchema;
            break;

        default:
            break;
    }

    return [schemaValidation];
};

export const useViewport = () => {
    const [width, setWidth] = useState(
        () => (typeof window !== 'undefined' && window.innerWidth) || 0,
    );

    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return width;
};

export const useScrollPosition = (ref) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let scrollTimeout = null;

        const handleScroll = () => {
            const currentIndex = Math.round(ref.current.scrollLeft / ref.current.offsetWidth);
            setScrollPosition(currentIndex);

            setIsScrolling(true);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                setIsScrolling(false);
            }, 100);
        };

        const currentRef = ref.current;

        currentRef.addEventListener('scroll', handleScroll);

        return () => {
            currentRef.removeEventListener('scroll', handleScroll);
        };
    }, [ref]);

    return [scrollPosition, isScrolling];
};

export const useReportSubmitted = () => {
    const [moodSubmitted, setMoodSubmitted] = useState(false);
    const [isPossible, setIsPossible] = useState(true);
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    useEffect(() => {
        if (!uid) return;
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        const end = new Date();
        end.setHours(23, 59, 59, 999);

        let isMounted = true;

        if (isMounted) {
            const checkMoodIsSubmitted = async () => {
                const moodReportsRef = collection(db, 'moodReports');
                const moodReportsQuery = query(
                    moodReportsRef,
                    where('source.userId', '==', uid),
                    where('timestamp', '>=', start),
                    where('timestamp', '<=', end),
                );
                const docSnap = await getDocs(moodReportsQuery);

                setMoodSubmitted(!docSnap.empty);
            };

            const checkUnresolvedRequests = async () => {
                const contactRequestsRef = collection(db, 'contactRequests');
                const contactRequestsQuery = query(
                    contactRequestsRef,
                    where('target.userId', '==', uid),
                    where('resolve', '==', 'false'),
                );
                const docSnap = await getDocs(contactRequestsQuery);
                setIsPossible(docSnap.empty);
            };

            checkMoodIsSubmitted();
            checkUnresolvedRequests();
        }

        return () => {
            isMounted = false;
        };
    }, [uid]);

    return [moodSubmitted, setMoodSubmitted, isPossible, setIsPossible];
};
