import { useAppView } from '../../utils/hooks';
import { renderFormCopy } from '../../utils/helpers';
import Form from '../components/Organism/Form/Form';
import StepsIndicator from '../components/Molecules/StepsIndicator/StepsIndicator';

const UserFormView = () => {
    const [appView] = useAppView();
    return (
        <>
            <StepsIndicator appView={appView} />

            <div className='grid h-full w-full grid-cols-2 items-center'>
                <Form />

                <div className='flex items-center justify-center font-montserrat font-700 text-black'>
                    {renderFormCopy(appView)}
                </div>
            </div>
        </>
    );
};

export default UserFormView;
