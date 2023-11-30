// Agregate Users Data from 3 different collection (users, moodsReport, contactRequestsReport) to display them in proper way
export const aggregateUserData = async (
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
                        timestamp: item.timestamp,
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
                            timestamp: item.timestamp,
                            resolve: item.resolve,
                            note: item.note,
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
                dateOfBirth: user.dateOfbirth,
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
