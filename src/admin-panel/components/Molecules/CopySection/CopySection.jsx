import propTypes from 'prop-types';

const CopySection = ({ copy, className = {} }) => {
    const { title, description, illustration, altText } = copy || {};
    const classes = {
        container: `row-start-2 hidden flex-col items-center justify-center place-self-start pt-2 font-hind font-700 text-black hover:cursor-default md:flex ${
            className.container ? className.container : ''
        }`,
        title: `mb-4 ${className.title ? className.title : ''}`,
        description: `mb-24 w-full text-center font-montserrat font-400 ${
            className.description ? className.description : ''
        }`,
        illustration: `w-80 ${className.illustration ? className.illustration : ''}`,
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>{title}</h2>
            <p className={classes.description}>{description}</p>
            {illustration && (
                <img src={illustration} alt={altText} className={classes.illustration} />
            )}
        </div>
    );
};

CopySection.propTypes = {
    copy: propTypes.shape({
        title: propTypes.string.isRequired,
        description: propTypes.string.isRequired,
        illustration: propTypes.string,
        altText: propTypes.string,
    }),
    className: propTypes.shape({
        container: propTypes.string,
        title: propTypes.string,
        description: propTypes.string,
        illustration: propTypes.string,
    }),
};

export default CopySection;
