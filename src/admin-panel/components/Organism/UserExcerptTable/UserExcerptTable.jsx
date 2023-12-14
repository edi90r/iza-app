import PropTypes from 'prop-types';
import TableHead from '../../Molecules/TableHead/TableHead';
import TableBody from '../../Molecules/TableBody/TableBody';

const UserExcereptTable = ({ users }) => {
    const tableHeadLabels = [
        'Lp.',
        'imię i nazwisko',
        'adres',
        'telefon',
        'wiek',
        'kondycja',
        'prośby o kontakt',
    ];

    return (
        <div className='hidden w-full flex-1 lg:block'>
            <div className='h-full overflow-x-auto'>
                <table className='table text-left'>
                    <TableHead labels={tableHeadLabels} />
                    <TableBody users={users} />
                </table>
            </div>
        </div>
    );
};

UserExcereptTable.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserExcereptTable;
