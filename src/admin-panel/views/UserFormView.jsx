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
    const copy = renderFormCopy(appView) || {};

    return (
        <>
            <div className='grid h-full w-full grid-cols-2 grid-rows-[140px_1fr] gap-x-8'>
                {appView !== 'editUser' && appView !== 'editUserCredentials' && (
                    <StepsIndicator appView={appView} />
                )}

                <FormProvider {...methods}>
                    <Form />
                </FormProvider>

                <div className='row-start-2 flex flex-col items-center justify-center place-self-start pt-2 font-hind font-700 text-black hover:cursor-default'>
                    <h2 className='mb-4'>{copy.title}</h2>
                    <p className='mb-24 w-full text-center font-montserrat font-400'>
                        {copy.description}
                    </p>
                    <img src={copy.illustration} alt={copy.altText} className='w-80' />
                </div>
            </div>
        </>
    );
};

export default UserFormView;
