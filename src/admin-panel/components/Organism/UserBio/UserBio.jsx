import propTypes from 'prop-types';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import UserBioRecord from '../../Molecules/UserBioRecord/UserBioRecord';
import { computeUserAge } from '../../../../utils/helpers';

const UserBio = ({ user }) => {
    console.log(user);
    return (
        <div className='max-h-80 w-full'>
            <CardHeader
                title='Profil Użytkownika'
                describe='Tu znajdziesz podstawowe informacje o użytkowniku'
            />
            <ul className='card-content-height grid w-full grid-cols-2 overflow-hidden p-4 font-hind text-base font-400 text-black'>
                <UserBioRecord label='imię' content={user.name} />
                <UserBioRecord label='nazwisko' content={user.lastname} />
                <UserBioRecord label='wiek' content={computeUserAge(user.age)} />
                <UserBioRecord label='miasto' content={user.city} />
                <UserBioRecord label='ulica' content={user.street} />
                <UserBioRecord label='nr. domu' content={user.houseNumber} />
                <UserBioRecord label='nr. mieszkania' content={user.apartmentNumber} />
                <UserBioRecord label='nr. telefonu' content={user.phoneNumber} />
                <UserBioRecord
                    label='opis'
                    content={user.describe}
                    last
                    className={{ wrapper: 'col-span-2', content: 'h-32 overflow-y-auto' }}
                />
            </ul>
        </div>
    );
};

UserBio.propTypes = {
    user: propTypes.shape({
        name: propTypes.string.isRequired,
        lastname: propTypes.string.isRequired,
        age: propTypes.string.isRequired,
        city: propTypes.string.isRequired,
        street: propTypes.string.isRequired,
        houseNumber: propTypes.number.isRequired,
        apartmentNumber: propTypes.number.isRequired,
        phoneNumber: propTypes.number.isRequired,
        describe: propTypes.string.isRequired,
    }),
};

export default UserBio;
