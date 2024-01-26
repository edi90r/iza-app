import propTypes from 'prop-types';

const CollapseTitleRecord = ({ title, content = '' }) => {
    return (
        <p>
            <span className='me-2'>{title}</span>
            {content && <span>{content}</span>}
        </p>
    );
};

CollapseTitleRecord.propTypes = {
    title: propTypes.string.isRequired,
    content: propTypes.string,
};

export default CollapseTitleRecord;
