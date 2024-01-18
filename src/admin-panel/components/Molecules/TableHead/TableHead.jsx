import PropTypes from 'prop-types';

const TableHead = ({ labels }) => {
    return (
        <thead>
            <tr>
                {labels.map((label, index) => (
                    <th key={index}>{label}</th>
                ))}
            </tr>
        </thead>
    );
};

TableHead.propTypes = {
    labels: PropTypes.array.isRequired,
};

export default TableHead;
