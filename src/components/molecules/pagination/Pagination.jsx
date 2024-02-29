import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { twMerge } from 'tailwind-merge';
import PaginationInput from '../../atoms/paginationInput/PaginationInput';
import { isObjectEmpty } from '../../../utils/helpers';

const Pagination = ({ refs, scrollPosition, className = '', handleClick }) => {
    const classes = twMerge('join fixed bottom-4 left-1/2 -translate-x-1/2', className);

    return (
        <div className={classes}>
            {!isObjectEmpty(refs) &&
                Object.entries(refs).map((refKey, index) => {
                    return (
                        <PaginationInput
                            key={uuidv4()}
                            inputRef={refKey[1]}
                            ariaLabel={index}
                            checked={scrollPosition === index ? true : false}
                            handleClick={handleClick}
                            readOnly
                        />
                    );
                })}
        </div>
    );
};

Pagination.propTypes = {
    className: propTypes.string,
    refs: propTypes.object.isRequired,
    scrollPosition: propTypes.number.isRequired,
    handleClick: propTypes.func.isRequired,
};

export default Pagination;
