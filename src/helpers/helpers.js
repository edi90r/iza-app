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

        users.forEach((user) => {
            const reports = [];

            moodReports.forEach((item) => {
                if (item.source.userId === user.uid) {
                    reports.push({
                        moodId: item.moodId,
                        source: {
                            userId: item.source.userId,
                        },
                        timestamp: item.timestamp.toDate(),
                        mood: item.mood,
                        contactRequests: [],
                    });
                }
            });

            contactRequestReports.forEach((item) => {
                if (item.source.userId === user.uid) {
                    const moodReport = reports.find(
                        (report) => report.source.userId === item.source.userId,
                    );
                    if (moodReport) {
                        moodReport.contactRequests.push({
                            contactRequestId: item.contactRequestId,
                            source: {
                                userId: item.source.userId,
                            },
                            timestamp: item.timestamp.toDate(),
                            resolve: item.resolve,
                            note: {
                                text: item.note.text,
                                timestamp: item.note.timestamp.toDate(),
                            },
                        });
                    } else {
                        moodReport.contactRequests = [];
                    }
                }
            });

            aggregatedData.push({
                uid: user.uid,
                name: user.name,
                lastname: user.lastname,
                dateOfBirth: user.dateOfbirth.toDate(),
                personalIdentityNumber: user.personalIndentityNumber,
                adress: user.adress,
                describe: user.describe,
                calendar: reports,
            });
        });

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
