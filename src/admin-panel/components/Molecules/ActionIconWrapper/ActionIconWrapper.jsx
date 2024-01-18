import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ActionIcon from '../../Atoms/ActionIcon/ActionIcon';

const ActionIconWrapper = ({ data }) => {
    return (
        <>
            {data.map(({ action }) => (
                <ActionIcon key={uuidv4()} action={action} />
            ))}
        </>
    );
};

ActionIconWrapper.propTypes = {
    data: PropTypes.array.isRequired,
};

export default ActionIconWrapper;
