import { useForm, FormProvider } from 'react-hook-form';
import { useAppView, useValidation } from '../../utils/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { renderFormCopy } from '../../utils/helpers';
import Form from '../components/Organism/Forms/Form';
import StepsIndicator from '../components/Molecules/StepsIndicator/StepsIndicator';
// import { useMatches } from 'react-router-dom';

const UserFormView = () => {
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const methods = useForm({ mode: 'onChange', resolver: joiResolver(validationSchema) });

    return (
        <>
            {appView !== 'editUser' && appView !== 'editUserCredentials' && (
                <StepsIndicator appView={appView} />
            )}

            <div className='content-bottom-section-height grid w-full grid-cols-2 items-center py-10'>
                <FormProvider {...methods}>
                    <Form />
                </FormProvider>

                <div className='flex items-center justify-center font-montserrat font-700 text-black'>
                    {renderFormCopy(appView)}
                </div>
            </div>
        </>
    );
};

export default UserFormView;
