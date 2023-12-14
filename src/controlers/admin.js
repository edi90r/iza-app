import { collection, getDocs, where, query, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { aggregateUsersData } from '../utils/helpers';

/*** getUsersExcertp() - function to fetch users excerpt data from firebase,
     passed params are excerpt (boolean) and days (number) are required 
***/

export const getUsersExcertp = async (excerpt, days) => {
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
