import PropTypes from 'prop-types';
import TableHead from '../../Molecules/TableHead/TableHead';
import TableBody from '../../Molecules/TableBody/TableBody';
import CardHeader from '../../Molecules/CardHeader/CardHeader';
import CardWrapper from '../../Atoms/CardWrapper/CardWrapper';

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
        <div className='mb-8 hidden w-full xs:block lg:mb-0'>
            <CardWrapper className='h-auto max-h-112 overflow-x-auto'>
                <CardHeader
                    title='Użytkownicy'
                    describe='lista użytkowników, zmień liczbę wyświetlanych dni aby zobaczyć kondycje użytkowników kolejno z jedno lub pięciu dni'
                />
                <table className='table text-left'>
                    <TableHead labels={tableHeadLabels} />
                    <TableBody users={users} />
                </table>
            </CardWrapper>
        </div>
    );
};

UserExcereptTable.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UserExcereptTable;
