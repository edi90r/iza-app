import propTypes from 'prop-types';

const CardRecord = ({
    label,
    content,
    className = { wrapper: '', label: '', content: '' },
    last = false,
}) => {
    const classes = {
        wrapper: `flex pb-1 cursor-default ${className.wrapper ? className.wrapper : ''}`,
        label: `text-gray-900 inline-block mr-2 ${className.label ? className.label : ''}`,
        content: `${className.content ? className.content : ''}`,
    };
    return (
        <>
            {!last ? (
                <li className={classes.wrapper}>
                    <span className={classes.content}>
                        <span className={classes.label}>{label}</span>
                        {content}
                    </span>
                </li>
            ) : (
                <li className={classes.wrapper}>
                    <span className={classes.label}>{label}</span>
                    <span className={classes.content}>{content}</span>
                </li>
            )}
        </>
    );
};

CardRecord.propTypes = {
    label: propTypes.string.isRequired,
    content: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
    className: propTypes.shape({
        wrapper: propTypes.string,
        label: propTypes.string,
        content: propTypes.string,
    }),
    last: propTypes.bool,
};

export default CardRecord;
