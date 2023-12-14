/*** - AgregateUsersData from 3 different collection(users, moodsReport, contactRequestsReport) 
       to display them in proper way. It is used in getUsersExcerpt() 
***/

export const aggregateUsersData = async (
    users = [],
    moodReports = [],
    contactRequestReports = [],
) => {
    try {
        const aggregatedData = [];

        for (const user of users) {
            const reports = moodReports
                .filter((item) => item.source.userId === user.uid)
                .map((item) => ({
                    moodId: item.moodId,
                    source: {
                        userId: item.source.userId,
                    },
                    timestamp: new Date(item.timestamp.toDate()).toISOString(),
                    mood: item.mood,
                    contactRequests: [],
                }));

            for (const item of contactRequestReports) {
                if (item.source.userId === user.uid) {
                    const moodReport = reports.find(
                        (report) =>
                            report.source.userId === item.source.userId &&
                            new Date(report.timestamp).toISOString().split('T')[0] ===
                                new Date(item.timestamp.toDate()).toISOString().split('T')[0],
                    );

                    if (moodReport) {
                        if (Object.prototype.hasOwnProperty.call(item, 'note')) {
                            moodReport.contactRequests.push({
                                contactRequestId: item.contactRequestId,
                                source: {
                                    userId: item.source.userId,
                                },
                                timestamp: new Date(item.timestamp.toDate()).toISOString(),
                                resolve: item.resolve,
                                note: {
                                    text: item.note.text,
                                    timestamp: new Date(item.timestamp.toDate()).toISOString(),
                                },
                                type: item.type,
                            });
                        }
                        moodReport.contactRequests.push({
                            contactRequestId: item.contactRequestId,
                            source: {
                                userId: item.source.userId,
                            },
                            timestamp: new Date(item.timestamp.toDate()).toISOString(),
                            resolve: item.resolve,
                            type: item.type,
                        });
                    }
                }
            }

            aggregatedData.push({
                uid: user.uid,
                name: user.name,
                lastname: user.lastname,
                dateOfBirth: new Date(user.dateOfbirth.toDate()).toISOString().split('T')[0],
                personalIdentityNumber: user.personalIndentityNumber,
                adress: user.adress,
                describe: user.describe,
                calendar: reports,
            });
        }

        return aggregatedData;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};
export const computeUserAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

export const displayUserAddressCorrectly = (adress) => {
    const { city, street, houseNumber, apartmentNumber } = adress;

    return `${street ? street : city} ${houseNumber}${
        apartmentNumber !== 0 ? `/${apartmentNumber}` : ''
    }`;
};

/*** - MarkedMissingDays() - function to mark missing days in calendar
 ***/
export const markedMissingDays = (data, action, days) => {
    const actionByDate = new Map();
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    for (let i = 0; i < days; i++) {
        const date = new Date(today - i * oneDay);
        const dateString = date.toISOString().split('T')[0]; // format as 'YYYY-MM-DD'

        actionByDate.set(dateString, 'missing');
    }

    data.forEach((item) => {
        const dateString = new Date(item.timestamp).toISOString().split('T')[0];

        actionByDate.set(dateString, item[action]);
    });

    return Array.from(actionByDate)
        .map(([timestamp, action]) => ({
            action,
            timestamp,
        }))
        .reverse();
};

export const getUserActions = (data = [], days) => {
    const contactRequests = data.map((item) => {
        const { contactRequests } = item;
        const latestContactRequest = contactRequests.flat().filter((item) => !item.resolve);

        return latestContactRequest;
    });
    return {
        contactRequests: markedMissingDays(contactRequests.flat(), 'type', days),
        moods: markedMissingDays(data, 'mood', days),
    };
};

export const getuUserStats = (data = []) => {
    const computeUsersAmount = (data) => {
        let userAmount = 0;
        // eslint-disable-next-line no-unused-vars
        data.forEach((_user) => {
            userAmount = ++userAmount;
        });
        return userAmount;
    };

    const computeTypesOfMood = (data, mood) => {
        let moodAmount = 0;
        data.forEach((item) => {
            if (item.calendar.length === 0) return;

            const test = item.calendar.filter((item) => item.mood === mood);
            moodAmount = moodAmount + test.length;
        });
        return moodAmount;
    };

    const computeContactRequests = (data) => {
        let contactRequestsAmount = 0;
        data.forEach((item) => {
            if (item.calendar.length === 0) return;
            const { calendar } = item;
            calendar.forEach((item) => {
                const { contactRequests } = item;
                if (contactRequests.length === 0) return;
                contactRequests.filter((item) => !item.resolve);
                contactRequestsAmount = contactRequestsAmount + contactRequests.length;
            });
        });
        return contactRequestsAmount;
    };

    return [
        { label: 'użytkownicy', record: computeUsersAmount(data) },
        { label: 'dobry', record: computeTypesOfMood(data, 'good') },
        { label: 'średni', record: computeTypesOfMood(data, 'average') },
        { label: 'zły', record: computeTypesOfMood(data, 'bad') },
        { label: 'prośba o kontakt', record: computeContactRequests(data) },
    ];
};