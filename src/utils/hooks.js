import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import {
    UserPersonalDataSchema,
    UserContactDataSchema,
    UserCredentialsSchema,
    UserDataSummarySchema,
} from './formValidation';

export const useAppView = () => {
    const [appView, setAppView] = useState('');
    const [matchObj, setMatchObj] = useState({});
    const { pathname } = useLocation();

    useEffect(() => {
        const routesPattern = [
            {
                pattern: '/admin',
                view: 'dashboard',
            },
            {
                pattern: '/admin/user-details/:id',
                view: 'userDetails',
            },
            {
                pattern: '/admin/add-user/personal-data',
                view: 'addUserPersonalData',
            },
            {
                pattern: '/admin/add-user/contact-data',
                view: 'addUserContactData',
            },
            {
                pattern: '/admin/add-user/register',
                view: 'addUserRegister',
            },
            {
                pattern: '/admin/add-user/summary',
                view: 'addUserSummary',
            },
            {
                pattern: '/admin/edit-user',
                view: 'editUser',
            },
        ];

        routesPattern.map((routePattern) => {
            const match = matchPath(routePattern.pattern, pathname);
            return match && (setMatchObj(match), setAppView(routePattern.view));
        });
    }, [pathname, appView]);
    return [appView, matchObj];
};

export const useValidation = (appView) => {
    let schemaValidation = null;
    switch (appView) {
        case 'addUserPersonalData':
            schemaValidation = UserPersonalDataSchema;
            break;
        case 'addUserContactData':
            schemaValidation = UserContactDataSchema;
            break;
        case 'addUserRegister':
            schemaValidation = UserCredentialsSchema;
            break;
        case 'addUserSummary':
            schemaValidation = UserDataSummarySchema;
            break;

        default:
            break;
    }

    return [schemaValidation];
};
