import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const getUsers = async () => {
    try {
        const users = [];
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            users.push({ uid: doc.id, ...doc.data() });
        });
        return users;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
};

// export const addUsers = async () => {
//     const data = [
//         {
//             name: 'James',
//             lastname: 'Smith',
//             dateOfbirth: '9/19/1947',
//             personalIndentityNumber: '34456367223',
//             adress: {
//                 city: 'Warsaw',
//                 street: 'piotrkowska',
//                 houseNumber: 55,
//                 apartmentNumber: 44,
//                 phoneNumber: '414587194',
//             },
//             describe:
//                 'Difficulty remembering recent conversations and events. Gets lost in familiar places; struggles with dates and seasons.',
//         },
//         {
//             name: 'John',
//             lastname: 'Doe',
//             dateOfbirth: '5/12/1985',
//             personalIndentityNumber: '1234567890',
//             adress: {
//                 city: 'New York',
//                 street: 'Broadway',
//                 houseNumber: 123,
//                 apartmentNumber: 456,
//                 phoneNumber: '9876543210',
//             },
//             describe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//         },
//         {
//             name: 'Emily',
//             lastname: 'Johnson',
//             dateOfbirth: '7/8/1995',
//             personalIndentityNumber: '5678901234',
//             adress: {
//                 city: 'Paris',
//                 street: 'Champs-Élysées',
//                 houseNumber: 456,
//                 apartmentNumber: 789,
//                 phoneNumber: '0987654321',
//             },
//             describe:
//                 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
//         },
//         {
//             name: 'Michael',
//             lastname: 'Brown',
//             dateOfbirth: '11/15/1980',
//             personalIndentityNumber: '9876543210',
//             adress: {
//                 city: 'Berlin',
//                 street: 'Unter den Linden',
//                 houseNumber: 321,
//                 apartmentNumber: 654,
//                 phoneNumber: '5678901234',
//             },
//             describe:
//                 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         },
//         {
//             name: 'Sophia',
//             lastname: 'Miller',
//             dateOfbirth: '2/4/1992',
//             personalIndentityNumber: '3456789012',
//             adress: {
//                 city: 'Tokyo',
//                 street: 'Shibuya',
//                 houseNumber: 789,
//                 apartmentNumber: 123,
//                 phoneNumber: '9876543210',
//             },
//             describe:
//                 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
//         },
//         {
//             name: 'Daniel',
//             lastname: 'Wilson',
//             dateOfbirth: '9/1/1988',
//             personalIndentityNumber: '5678901234',
//             adress: {
//                 city: 'Sydney',
//                 street: 'George Street',
//                 houseNumber: 456,
//                 apartmentNumber: 789,
//                 phoneNumber: '1234567890',
//             },
//             describe:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         },
//         {
//             name: 'Olivia',
//             lastname: 'Taylor',
//             dateOfbirth: '6/20/1997',
//             personalIndentityNumber: '7890123456',
//             adress: {
//                 city: 'Rome',
//                 street: 'Via del Corso',
//                 houseNumber: 123,
//                 apartmentNumber: 456,
//                 phoneNumber: '5678901234',
//             },
//             describe:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         },
//         {
//             name: 'Ethan',
//             lastname: 'Anderson',
//             dateOfbirth: '4/10/1994',
//             personalIndentityNumber: '9012345678',
//             adress: {
//                 city: 'Moscow',
//                 street: 'Tverskaya',
//                 houseNumber: 789,
//                 apartmentNumber: 123,
//                 phoneNumber: '7890123456',
//             },
//             describe:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         },
//         {
//             name: 'Ava',
//             lastname: 'Thomas',
//             dateOfbirth: '8/5/1999',
//             personalIndentityNumber: '2345678901',
//             adress: {
//                 city: 'Madrid',
//                 street: 'Gran Via',
//                 houseNumber: 456,
//                 apartmentNumber: 789,
//                 phoneNumber: '9012345678',
//             },
//             describe:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//         },
//         {
//             name: 'Jane',
//             lastname: 'Smith',
//             dateOfbirth: '3/25/1990',
//             personalIndentityNumber: '0987654321',
//             adress: {
//                 city: 'London',
//                 street: 'Oxford Street',
//                 houseNumber: 789,
//                 apartmentNumber: 321,
//                 phoneNumber: '1234567890',
//             },
//             describe:
//                 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//         },
//     ];

// data.forEach(async (user) => {
//     try {
//         const docRef = await addDoc(collection(db, 'users'), user);
//         console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//         console.error('Error adding document: ', e);
//     }
// });
// };
