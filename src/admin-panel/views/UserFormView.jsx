import { useForm, FormProvider } from 'react-hook-form';
import { useAppView, useValidation } from '../../utils/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { renderFormCopy } from '../../utils/helpers';
import Form from '../components/Organism/Forms/Form';
import StepsIndicator from '../components/Molecules/StepsIndicator/StepsIndicator';

const UserFormView = () => {
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const methods = useForm({ mode: 'onChange', resolver: joiResolver(validationSchema) });

    return (
        <>
            <div className='grid h-full w-full grid-cols-2 grid-rows-[120px_1fr]'>
                {appView !== 'editUser' && appView !== 'editUserCredentials' && (
                    <StepsIndicator appView={appView} />
                )}
                <FormProvider {...methods}>
                    <Form />
                </FormProvider>

                <div className='flex items-center justify-center font-montserrat font-700 text-black lg:col-start-2 lg:row-span-2 lg:row-start-1'>
                    {renderFormCopy(appView)}
                </div>
            </div>
        </>
    );
};

export default UserFormView;
