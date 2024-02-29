import propTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const Wrapper = ({ children, sectionRef, className }) => {
    const classes = twMerge(
        'relative flex h-full min-w-full shrink-0 snap-center items-center justify-around flex-col md:flex-row',
        className,
    );

    return (
        <div className={classes} ref={sectionRef}>
            {children}
        </div>
    );
};

Wrapper.propTypes = {
    className: propTypes.string,
    children: propTypes.node.isRequired,
    sectionRef: propTypes.object,
};

export default Wrapper;
