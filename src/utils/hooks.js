import { useState, useEffect } from 'react';
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
} from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

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
            setUserRole(null);
            setError(null);
        } catch (error) {
            console.log(error);
        }
    };

    const passwordReset = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    };

    const confirmThePasswordReset = async (oobCode, newPassword) => {
        if (!oobCode || !newPassword) return;
        return await confirmPasswordReset(auth, oobCode, newPassword);
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
        passwordReset,
        confirmThePasswordReset,
    };
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
    const [isPossible, setIsPossible] = useState(false);
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    if (!uid) return;
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

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
        const contactRequestsRef = collection(db, 'contactRequestReports');
        const contactRequestsQuery = query(
            contactRequestsRef,
            where('source.userId', '==', uid),
            where('timestamp', '>=', start),
            where('timestamp', '<=', end),
            where('resolve', '==', false),
        );
        const docSnap = await getDocs(contactRequestsQuery);
        setIsPossible(docSnap.empty);
    };

    return {
        moodSubmitted,
        setMoodSubmitted,
        isPossible,
        setIsPossible,
        checkMoodIsSubmitted,
        checkUnresolvedRequests,
    };
};
