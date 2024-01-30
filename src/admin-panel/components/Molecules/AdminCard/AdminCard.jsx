import propType from 'prop-types';
import Avatar from '../../Atoms/Avatar/Avatar';

const AdminCard = ({ title, facility }) => {
    return (
        <div className='flex justify-center'>
            <Avatar />

            <div className='font-hindtext-black ms-4 h-16 w-2/3 hover:cursor-default'>
                <h2 className='font-700'>{title}</h2>
                <p className='text-gray-50'>{facility}</p>
            </div>
        </div>
    );
};

AdminCard.propTypes = {
    title: propType.string.isRequired,
    facility: propType.string.isRequired,
};

export default AdminCard;
