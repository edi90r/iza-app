import PropTypes from 'prop-types';
import TableHead from '../../Molecules/TableHead/TableHead';
import TableRow from '../../Molecules/TableRow/TableRow';

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
        <div className='h-full overflow-x-auto'>
            <table className='table text-left'>
                <TableHead labels={tableHeadLabels} />
                <TableRow users={users} />
            </table>
        </div>
    );
};

UserExcereptTable.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserExcereptTable;
