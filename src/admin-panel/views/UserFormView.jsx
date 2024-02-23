import { useEffect, useState, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAppView, useValidation } from '../../utils/hooks';
import { joiResolver } from '@hookform/resolvers/joi';
import { isObjectEmpty, renderFormCopy } from '../../utils/helpers';
import Form from '../components/Organism/Forms/Form';
import StepsIndicator from '../components/Molecules/StepsIndicator/StepsIndicator';
import CopySection from '../components/Molecules/CopySection/CopySection';
import Loader from '../components/Atoms/Loader/Loader';

const UserFormView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const methods = useForm({ mode: 'onChange', resolver: joiResolver(validationSchema) });
    const copy = useMemo(() => renderFormCopy(appView), [appView]);

    useEffect(() => {
        if (!isObjectEmpty(copy)) {
            setIsLoading(false);
        }
    }, [copy]);

    return (
        <>
            {isLoading && <Loader className='absolute left-1/2 top-1/2' />}
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
