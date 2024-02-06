import { useForm, FormProvider } from 'react-hook-form';
import { useAppView, useValidation } from '../../utils/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { renderFormCopy } from '../../utils/helpers';
import Form from '../components/Organism/Forms/Form';
import StepsIndicator from '../components/Molecules/StepsIndicator/StepsIndicator';
import CopySection from '../components/Molecules/CopySection/CopySection';

const UserFormView = () => {
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const methods = useForm({ mode: 'onChange', resolver: joiResolver(validationSchema) });
    const copy = renderFormCopy(appView) || {};

    return (
        <>
            <div className='grid h-full w-full grid-cols-2 grid-rows-[140px_1fr] gap-x-0 lg:gap-x-8'>
                {appView !== 'editUser' && appView !== 'editUserCredentials' && (
                    <StepsIndicator appView={appView} />
                )}

                <FormProvider {...methods}>
                    <Form />
                </FormProvider>

                <CopySection copy={copy} />
            </div>
        </>
    );
};

export default UserFormView;
