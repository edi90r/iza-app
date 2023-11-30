import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { aggregateUserData } from '../helpers/helpers';

export const getUsers = async () => {
    try {
        const usersQuerySnapshot = await getDocs(collection(db, 'users'));
        const moodReportsQuerySnapshot = await getDocs(collection(db, 'moodReports'));
        const contactRequestReportsQuerySnapshot = await getDocs(
            collection(db, 'contactRequestReports'),
        );
        const users = usersQuerySnapshot.docs.map((doc) => {
            return { uid: doc.id, ...doc.data() };
        });
        const moodsReport = moodReportsQuerySnapshot.docs.map((doc) => {
            return { moodId: doc.id, ...doc.data() };
        });
        const contactRequestsReport = contactRequestReportsQuerySnapshot.docs.map((doc) => {
            return { contactRequestId: doc.id, ...doc.data() };
        });

        const aggregatedData = await aggregateUserData(users, moodsReport, contactRequestsReport);

        return aggregatedData;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};
