export const isObjectEmpty = (objectName) => {
    return objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object;
};
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
                                note: item.note,
                                type: item.type,
                            });
                        } else {
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
            }

            aggregatedData.push({
                uid: user.uid,
                name: user.name,
                lastname: user.lastname,
                dateOfBirth: new Date(user.dateOfBirth.toDate()).toISOString().split('T')[0],
                personalIdentityNumber: user.personalIdentityNumber,
                address: user.address,
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

export const displayUserAddressCorrectly = (address) => {
    const { city, street, houseNumber, apartmentNumber } = address;

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

export const validatePhoneNumber = (phoneNumber, helpers) => {
    const reg = /^([+]?\d{1,2}[-\s]?|)\d{2,3}[-\s]?\d{2,3}[-\s]?\d{3}$/;

    return reg.test(phoneNumber)
        ? phoneNumber
        : helpers.message('Podany format telefonu jest niepoprawny');
};

export const validatePesel = (pesel, helpers) => {
    const reg = /^[0-9]{11}$/;

    if (!reg.test(pesel)) {
        return helpers.error('any.invalid');
    }

    const digits = pesel.toString().split('');

    let checksum =
        (1 * parseInt(digits[0], 10) +
            3 * parseInt(digits[1], 10) +
            7 * parseInt(digits[2], 10) +
            9 * parseInt(digits[3], 10) +
            1 * parseInt(digits[4], 10) +
            3 * parseInt(digits[5], 10) +
            7 * parseInt(digits[6], 10) +
            9 * parseInt(digits[7], 10) +
            1 * parseInt(digits[8], 10) +
            3 * parseInt(digits[9], 10)) %
        10;

    if (checksum === 0) checksum = 10;

    checksum = 10 - checksum;
    const result = parseInt(digits[10], 10) === checksum;
    if (!result) {
        return helpers.error('any.invalid');
    }
    return pesel;
};

export const renderFormCopy = (appView) => {
    switch (appView) {
        case 'addUserPersonalData':
            return 'Dane osobowe';
        case 'addUserContactData':
            return 'Dane kontaktowe';
        case 'addUserRegister':
            return 'Zarejestruj użytkownika';
        case 'addUserSummary':
            return 'Podsumowanie';
        case 'editUser':
            return 'Edytuj użytkownika';
        case 'editUserCredentials':
            return 'Edytuj login lub hasło';
        default:
            break;
    }
};

export const setSpecificDataShape = (data, reverse = false) => {
    const date = !reverse
        ? data.dateOfBirth
        : new Date(data.dateOfBirth.toDate()).toISOString().split('T')[0];

    return !reverse
        ? {
              name: data.name,
              lastname: data.lastname,
              dateOfBirth: date,
              personalIdentityNumber: data.personalIdentityNumber,
              address: {
                  city: data.city,
                  street: data.street,
                  houseNumber: data.houseNumber,
                  apartmentNumber: `${data.apartmentNumber === '' ? 0 : data.apartmentNumber}` * 1,
                  phoneNumber: data.phoneNumber,
              },
              describe: data.describe,
          }
        : {
              name: data.name,
              lastname: data.lastname,
              dateOfBirth: date,
              personalIdentityNumber: data.personalIdentityNumber,
              city: data.address.city,
              street: data.address.street,
              houseNumber: data.address.houseNumber,
              apartmentNumber: data.address.apartmentNumber,
              phoneNumber: data.address.phoneNumber,
              describe: data.describe,
          };
};

export const setUserMoodStylesClass = (rmdpDate, userCalendar) => {
    let props = {};
    userCalendar.forEach((day) => {
        const rmdpDay = rmdpDate.format('YYYY-MM-DD');
        const userDay = day.timestamp.split('T')[0];

        if (rmdpDay === userDay) {
            switch (day.mood) {
                case 'good':
                    props.className = 'mood-good';
                    break;
                case 'average':
                    props.className = 'mood-average';
                    break;
                case 'bad':
                    props.className = 'mood-bad';

                    break;
                default:
                    break;
            }

            if (day.contactRequests.length) {
                if (
                    !(
                        Object.prototype.hasOwnProperty.call(props, 'className') &&
                        props.className.includes('cr')
                    )
                ) {
                    props.className = `${props.className} cr`;
                }
            }
        }
    });
    return props;
};

export const convertFirebaseTimestamp = (timestamp, type) => {
    if (timestamp) {
        if (type === 'time') {
            return new Date(timestamp).toLocaleTimeString('en', {
                timeStyle: 'short',
                hour12: false,
                timeZone: 'UTC',
            });
        }
        if (type === 'date') {
            return new Date(timestamp).toISOString().substring(0, 10);
        }
        throw new Error('type parameter has to be string "date" or "time"');
    }
    return undefined;
};
