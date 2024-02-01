import propTypes from 'prop-types';
import FormInput from '../../Molecules/FormInput/FormInput';
import Button from '../../Atoms/Button/Button';
import SelectionControl from '../../Molecules/SelectionControl/SelectionControl';
import CardRecord from '../../Molecules/CardRecord/CardRecord';
import CollapseTitleRecord from '../../Atoms/CollapseTitleRecord/CollapseTitleRecord';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useValidation, useAppView } from '../../../../utils/hooks';
import { updateStatus, updateNote } from '../../../../controlers/admin';
import { joiResolver } from '@hookform/resolvers/joi';
import { convertFirebaseTimestamp } from '../../../../utils/helpers';

const ContactRequestsItem = ({ details, index }) => {
    const [collapseContactRequest, setCollapseContactRequest] = useState(false);
    const [radioChecked, setRadioChecked] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState(details);
    const [appView] = useAppView();
    const [validationSchema] = useValidation(appView);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        setValue,
    } = useForm({ mode: 'onBlur', resolver: joiResolver(validationSchema) });

    const handleCollapseRequests = () => {
        setCollapseContactRequest(!collapseContactRequest);
    };

    const handleUpdateStatus = useCallback(
        (e) => {
            updateStatus(updatedDetails.contactRequestId, !updatedDetails.resolve);
            setUpdatedDetails({ ...updatedDetails, resolve: e.target.checked });
        },
        [updatedDetails],
    );

    const handleUpdateNote = useCallback(() => {
        setRadioChecked(!radioChecked);
    }, [radioChecked]);

    const typeOfRequest = useMemo(
        () => ({
            dietician: 'dietetyk',
            careGiver: 'opiekun',
            doctor: 'lekarz',
        }),
        [],
    );

    const onSubmit = async (data) => {
        const updatedObject = await updateNote(updatedDetails.contactRequestId, data.note);
        setUpdatedDetails(updatedObject);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setRadioChecked(false);
        }
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        if (radioChecked && updatedDetails.note) {
            setValue('note', updatedDetails.note);
        }
    }, [updatedDetails.note, setValue, radioChecked]);

    return (
        <div className='collapse collapse-arrow mb-2'>
            <input
                type='radio'
                name='collapse-radio'
                className='collapse-radio min-h-7'
                checked={collapseContactRequest}
                onChange={(e) => handleCollapseRequests(e)}
            />
            <li className='collapse-title grid min-h-7 grid-cols-[16px_160px_160px] gap-x-2 bg-gray-50 bg-opacity-25 py-2 font-hind'>
                <CollapseTitleRecord title={`${index + 1}.`} />
                <CollapseTitleRecord title='typ:' content={typeOfRequest[updatedDetails.type]} />
                <CollapseTitleRecord
                    title='godzina:'
                    content={convertFirebaseTimestamp(updatedDetails.timestamp.toDate(), 'time')}
                />
            </li>
            <div className='collapse-content grid grid-cols-[16px_160px_1fr] gap-x-2 border border-t-0 p-0 pe-12 ps-4 font-hind'>
                <SelectionControl
                    label='prośba przyjęta'
                    name={`toggle-${index}`}
                    type='checkbox'
                    onChange={(e) => handleUpdateStatus(e)}
                    onClick={() =>
                        updateStatus(updatedDetails.contactRequestId, !updatedDetails.resolve)
                    }
                    checked={updatedDetails.resolve}
                    className={{
                        wrapper: 'col-start-2 justify-start',
                        input: 'toggle-custom toggle toggle-success',
                    }}
                />
                <SelectionControl
                    label={updatedDetails.note ? 'edytuj notatkę' : 'dodaj notatkę'}
                    name={`radio-${index}`}
                    type='radio'
                    onChange={() => {}}
                    onClick={(e) => handleUpdateNote(e)}
                    checked={radioChecked}
                    className={{
                        wrapper: 'col-3 justify-start',
                        input: `${
                            updatedDetails.note
                                ? 'radio checked:bg-warning'
                                : ' radio checked:bg-success'
                        }`,
                    }}
                />

                {updatedDetails.note && !radioChecked && (
                    <CardRecord
                        label='notatka'
                        content={updatedDetails.note}
                        className={{ wrapper: 'col-span-2 col-start-2 mt-2' }}
                    />
                )}
                {radioChecked && (
                    <>
                        <FormInput
                            register={register}
                            name='note'
                            type='text'
                            placeholder={updatedDetails.note ? 'edytuj notatkę' : 'dodaj notatkę'}
                            className={{
                                input: 'h-20',
                                container: 'col-span-2 col-start-2 mt-2 pt-0',
                                wrapper: 'pb-0',
                            }}
                            error={errors.note}
                            onChange={() => {}}
                        />

                        <Button
                            className='col-start-3 mt-2 h-8 min-h-0 max-w-8 place-self-end'
                            type='submit'
                            onClick={handleSubmit(onSubmit)}
                        >
                            {updatedDetails.note ? 'zapisz' : 'dodaj'}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

ContactRequestsItem.propTypes = {
    index: propTypes.number,
    details: propTypes.shape({
        type: propTypes.string,
        resolve: propTypes.bool,
        note: propTypes.string,
    }),
};

export default ContactRequestsItem;
