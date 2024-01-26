import {
    collection,
    getDocs,
    where,
    query,
    Timestamp,
    addDoc,
    getDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { aggregateUsersData } from '../utils/helpers';

/*** getUsersExcertp() - function to fetch users excerpt data from firebase,
     passed params are excerpt (boolean) and days (number) are required 
***/

/***===GET=== ***/

export const getUsersExcertp = async (excerpt = false, days) => {
    try {
        const timePeriod = new Date();
        timePeriod.setHours(23, 59, 59, 999);
        timePeriod.setDate(timePeriod.getDate() - days);

        const timeStampPeriod = Timestamp.fromDate(timePeriod);

        const usersQuerySnapshot = await getDocs(collection(db, 'users'));

        const moodReportsRef = collection(db, 'moodReports');
        const moodReportsQuery = excerpt
            ? query(moodReportsRef, where('timestamp', '>=', timeStampPeriod))
            : null;
        const moodReportsQuerySnapshot = excerpt
            ? await getDocs(moodReportsQuery)
            : await getDocs(moodReportsRef);

        const contactRequestReportsRef = collection(db, 'contactRequestReports');
        const contactRequestReportsQuery = excerpt
            ? query(contactRequestReportsRef, where('timestamp', '>=', timeStampPeriod))
            : null;
        const contactRequestReportsQuerySnapshot = excerpt
            ? await getDocs(contactRequestReportsQuery)
            : await getDocs(contactRequestReportsRef);

        const users = usersQuerySnapshot.docs.map((doc) => {
            return { uid: doc.id, ...doc.data() };
        });

        const moodsReport = moodReportsQuerySnapshot.docs.map((doc) => {
            return { moodId: doc.id, ...doc.data() };
        });

        const contactRequestsReport = contactRequestReportsQuerySnapshot.docs.map((doc) => {
            return { contactRequestId: doc.id, ...doc.data() };
        });

        const aggregatedData = await aggregateUsersData(users, moodsReport, contactRequestsReport);

        return aggregatedData;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};

export const getUserById = async (userId, reports = false) => {
    try {
        let agregatedData;
        const userRef = doc(db, 'users', userId);
        const userQuerySnapshot = await getDoc(userRef);

        const data = userQuerySnapshot.exists() ? userQuerySnapshot.data() : null;

        if (data === null || data === undefined) return null;

        if (reports) {
            const moodReportsRef = collection(db, 'moodReports');
            const moodReportsQuery = query(moodReportsRef, where('source.userId', '==', userId));
            const moodReportsQuerySnapshot = await getDocs(moodReportsQuery);
            const moodReports = moodReportsQuerySnapshot.docs.map((doc) => {
                return { moodId: doc.id, ...doc.data() };
            });

            const contactRequestReportsRef = collection(db, 'contactRequestReports');
            const contactRequestReportsQuery = query(
                contactRequestReportsRef,
                where('source.userId', '==', userId),
            );
            const contactRequestReportsQuerySnapshot = await getDocs(contactRequestReportsQuery);
            const contactRequestReports = contactRequestReportsQuerySnapshot.docs.map((doc) => {
                return { contactRequestId: doc.id, ...doc.data() };
            });

            const userData = [{ uid: userQuerySnapshot.id, ...userQuerySnapshot.data() }];

            agregatedData = await aggregateUsersData(userData, moodReports, contactRequestReports);
        }
        return !reports ? { uid: userId, ...data } : agregatedData.flat()[0];
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export const getDailyContactRequests = async (userId, date) => {
    try {
        const timePeriodStart = new Date(date);
        const timePeriodEnd = new Date(date);
        timePeriodStart.setHours(0, 0, 0, 0);
        timePeriodEnd.setHours(23, 59, 59, 999);
        const timeStampStartPeriod = Timestamp.fromDate(timePeriodStart);
        const timeStampEndPeriod = Timestamp.fromDate(timePeriodEnd);

        const contactRequestReportsRef = collection(db, 'contactRequestReports');
        const contactRequestReportsQuery = query(
            contactRequestReportsRef,
            where('source.userId', '==', userId),
            where('timestamp', '>=', timeStampStartPeriod),
            where('timestamp', '<=', timeStampEndPeriod),
        );
        const contactRequestReportsQuerySnapshot = await getDocs(contactRequestReportsQuery);
        const data = contactRequestReportsQuerySnapshot.docs.map((doc) => {
            return { contactRequestId: doc.id, ...doc.data() };
        });

        return data;
    } catch (error) {
        console.error('Error getting contactRequests:', error);
        throw error;
    }
};

/***===POST=== ***/

export const createUser = async (userData) => {
    try {
        const userRef = await addDoc(collection(db, 'users'), userData);
        console.log('Document written with ID: ', userRef.id);
        return { userId: userRef.id };
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};

/***===PUT=== ***/

export const updateUser = async (userId, userData) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, userData);
        console.log('Document updated with ID: ', userRef.id);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const updateNote = async (contactRequestId, note) => {
    try {
        const contactRequestRef = doc(db, 'contactRequestReports', contactRequestId);
        await updateDoc(contactRequestRef, { note: note });

        const updatedDocSnapshot = await getDoc(contactRequestRef);
        if (updatedDocSnapshot.exists()) {
            return updatedDocSnapshot.data();
        } else {
            throw new Error('No document found with ID: ' + contactRequestId);
        }
    } catch (error) {
        console.error('Error updating contact request:', error);
        throw error;
    }
};

export const updateStatus = async (contactRequestId, status) => {
    try {
        const contactRequestRef = doc(db, 'contactRequestReports', contactRequestId);
        await updateDoc(contactRequestRef, { resolve: status });
        console.log('Document updated with ID: ', contactRequestRef.id);
    } catch (error) {
        console.error('Error updating contact request:', error);
        throw error;
    }
};
