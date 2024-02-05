import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import {
    getUserActions,
    computeUserAge,
    displayUserAddressCorrectly,
} from '../../../../utils/helpers';
import CardHeader from '../CardHeader/CardHeader';
import ActionIconWrapper from '../ActionIconWrapper/ActionIconWrapper';

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const goUserDetailsRoute = (id) => navigate(`/admin/user-details/${id}`);
    const { table } = useStore();

    const days = table.mode === 'oneDay' ? 1 : 5;

    const userActions = getUserActions(user.calendar, days);

    return (
        <div
            className='card flex-grow basis-1/2  border-primary bg-base-100 shadow-xl'
            onClick={() => goUserDetailsRoute(user.uid)}
        >
            <CardHeader title='Użytkownik' className={{ wrapper: 'rounded-t-lg bg-gray-100' }} />
            <div className='card-body'>
                <h2 className='card-title'>{`${user.name} ${user.lastname}`}</h2>
                <h3>{`${displayUserAddressCorrectly(user.address)}`}</h3>
                <h3>{`${user.address.phoneNumber}`}</h3>
                <h3>{`${computeUserAge(user.dateOfBirth)} lat`}</h3>
                <div className='flex justify-between'>
                    <ActionIconWrapper data={userActions.moods} />
                </div>
                <div className='flex justify-between'>
                    <ActionIconWrapper data={userActions.contactRequests} />
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            streetNumber: PropTypes.string,
            phoneNumber: PropTypes.number.isRequired,
        }),
        dateOfBirth: PropTypes.string.isRequired,
        calendar: PropTypes.array,
    }),
};

export default UserCard;
