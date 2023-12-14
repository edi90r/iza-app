import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store/useStore';
import {
    getUserActions,
    computeUserAge,
    displayUserAddressCorrectly,
} from '../../../../utils/helpers';
import ActionIconWrapper from '../ActionIconWrapper/ActionIconWrapper';

const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const goUserDetailsRoute = (id) => navigate(`/admin/user-details/${id}`);
    const { table } = useStore();

    const days = table.mode === 'oneDay' ? 1 : 5;

    const userActions = getUserActions(user.calendar, days);

    return (
        <div
            className='card max-w-sm bg-base-100 shadow-xl'
            onClick={() => goUserDetailsRoute(user.uid)}
        >
            <div className='card-body'>
                <h2 className='card-title'>{`${user.name} ${user.lastname}`}</h2>
                <h3>{`${displayUserAddressCorrectly(user.adress)}`}</h3>
                <h3>{`${user.adress.phoneNumber}`}</h3>
                <h3>{`${computeUserAge(user.dateOfBirth)} lat`}</h3>
                <div className='flex '>
                    <ActionIconWrapper data={userActions.moods} />
                </div>
                <div className='flex '>
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
        adress: PropTypes.shape({
            city: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            streetNumber: PropTypes.string.isRequired,
            phoneNumber: PropTypes.string.isRequired,
        }),
        dateOfBirth: PropTypes.string.isRequired,
        calendar: PropTypes.array,
    }),
};

export default UserCard;
