import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
const NavButton = ({ children, className = '', onClick, isScrolling, sectionRef }) => {
    const classes = twMerge(
        'absolute top-0 flex h-32 w-32 items-center justify-center bg-primary transition-opacity duration-200 ease-in-out',
        `${isScrolling ? 'opacity-0' : 'opacity-100'}`,
        className,
    );
    return (
        <div className={classes} onClick={() => onClick(sectionRef)}>
            {children}
        </div>
    );
};

NavButton.propTypes = {
    children: propTypes.node.isRequired,
    isScrolling: propTypes.bool.isRequired,
    className: propTypes.string,
    onClick: propTypes.func,
    sectionRef: propTypes.object,
};

export default NavButton;
