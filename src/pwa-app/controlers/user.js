import { getAuth } from 'firebase/auth';
const devURL = (nameFunc) =>
    `http://localhost:5001/quickstart-1550568083201/us-central1/${nameFunc}`;

export const sendReport = async (report) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const timestamp = new Date().toISOString();

    try {
        if (user) {
            const idToken = await user.getIdToken(true);
            const response = await fetch(devURL('saveMoodReport'), {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + idToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mood: report, timestamp }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error reporting user', error);
    }
};

export const sendContactRequestReport = async (report) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const timestamp = new Date().toISOString();

    try {
        if (user) {
            const idToken = await user.getIdToken(true);
            const response = await fetch(devURL('saveContactRequestReport'), {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + idToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: report, timestamp }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error reporting user', error);
    }
};
