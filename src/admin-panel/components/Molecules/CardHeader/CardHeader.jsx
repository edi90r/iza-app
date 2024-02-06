import propTypes from 'prop-types';

const CardHeader = ({
    title,
    describe = '',
    className = { wrapper: '', title: '', describe: '' },
    children,
}) => {
    const classes = {
        wrapper: `h-auto border-gray border-b p-4 hover:cursor-default ${
            className.wrapper ? className.wrapper : ''
        }`,
        title: `font-montserrat font-700 ${className.title ? className.title : ''}`,
        describe: `font-hind text-sm text-gray ${className.describe ? className.describe : ''}`,
    };

    return (
        <div className={classes.wrapper}>
            {children && (
                <>
                    <div>
                        <h2 className={classes.title}>{title}</h2>
                        <p className={classes.describe}>{describe}</p>
                    </div>
                    {children}
                </>
            )}
            {!children && (
                <>
                    <h2 className={classes.title}>{title}</h2>
                    <p className={classes.describe}>{describe}</p>
                </>
            )}
        </div>
    );
};

CardHeader.propTypes = {
    title: propTypes.string.isRequired,
    describe: propTypes.string,
    className: propTypes.shape({
        wrapper: propTypes.string,
        title: propTypes.string,
        describe: propTypes.string,
    }),
    children: propTypes.node,
};

export default CardHeader;
