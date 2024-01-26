import propTypes from 'prop-types';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import CardRecord from '../../Molecules/CardRecord/CardRecord';
import { computeUserAge } from '../../../../utils/helpers';

const UserBio = ({ user }) => {
    return (
        <div className='max-h-96 w-full'>
            <CardHeader
                title='Profil Użytkownika'
                describe='Tu znajdziesz podstawowe informacje o użytkowniku'
            />
            <ul className='card-content-height grid w-full grid-cols-2 overflow-hidden p-4 font-hind text-base font-400 text-black'>
                <CardRecord label='imię' content={user.name} />
                <CardRecord label='nazwisko' content={user.lastname} />
                <CardRecord label='wiek' content={computeUserAge(user.age)} />
                <CardRecord label='miasto' content={user.city} />
                <CardRecord label='ulica' content={user.street} />
                <CardRecord label='nr. domu' content={user.houseNumber} />
                <CardRecord label='nr. mieszkania' content={user.apartmentNumber} />
                <CardRecord label='nr. telefonu' content={user.phoneNumber} />
                <CardRecord
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
