import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { computeUserAge, displayUserAddressCorrectly } from '../../../../utils/helpers';
import ActionIconWrapper from '../ActionIconWrapper/ActionIconWrapper';
import { getUserActions } from '../../../../utils/helpers';

const TableRow = ({ users, ...rest }) => {
    const navigate = useNavigate();
    const goUserDetailsRoute = (id) => navigate(`/admin/user-details/${id}`);

    return (
        <tbody>
            {users.map((user, index) => {
                const userActions = getUserActions(user.calendar, 5);

                return (
                    <tr
                        key={uuidv4()}
                        onClick={() => goUserDetailsRoute(user.uid)}
                        {...rest}
                        className='hover'
                    >
                        <th>{index + 1}</th>
                        <td>{`${user.name} ${user.lastname}`}</td>
                        <td>{displayUserAddressCorrectly(user.adress)}</td>
                        <td>{user.adress.phoneNumber}</td>
                        <td>{computeUserAge(user.dateOfBirth)}</td>
                        <td>
                            <div className='flex '>
                                <ActionIconWrapper data={userActions.moods} />
                            </div>
                        </td>
                        <td>
                            <div className='flex '>
                                <ActionIconWrapper data={userActions.contactRequests} />
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

TableRow.propTypes = {
    users: PropTypes.array.isRequired,
};

export default TableRow;
