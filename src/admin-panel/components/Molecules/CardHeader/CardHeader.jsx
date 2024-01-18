import propTypes from 'prop-types';

const CardHeader = ({ title, describe, className = { wrapper: '', title: '', describe: '' } }) => {
    const classes = {
        wrapper: `card-heading-height border-primary border-b-2 p-4 ${
            className.wrapper ? className.wrapper : ''
        }`,
        title: `font-montserrat font-700 ${className.title ? className.title : ''}`,
        describe: `font-hind text-sm text-gray${className.describe ? className.describe : ''}`,
    };

    return (
        <div className={classes.wrapper}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.describe}>{describe}</p>
        </div>
    );
};

CardHeader.propTypes = {
    title: propTypes.string.isRequired,
    describe: propTypes.string.isRequired,
    className: propTypes.shape({
        wrapper: propTypes.string,
        title: propTypes.string,
        describe: propTypes.string,
    }),
};

export default CardHeader;
