import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import {
    UserPersonalDataSchema,
    UserContactDataSchema,
    UserCredentialsSchema,
    UserDataSummarySchema,
    EditUserSchema,
    ContactRequestNoteSchema,
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
                pattern: '/admin/user-details/:id/edit',
                view: 'editUser',
            },
            {
                pattern: '/admin/user-details/:id/edit-credentials',
                view: 'editUserCredentials',
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
        case 'editUserCredentials':
            schemaValidation = UserCredentialsSchema;
            break;
        case 'addUserSummary':
            schemaValidation = UserDataSummarySchema;
            break;
        case 'editUser':
            schemaValidation = EditUserSchema;
            break;
        case 'userDetails':
            schemaValidation = ContactRequestNoteSchema;
            break;

        default:
            break;
    }

    return [schemaValidation];
};

export const useViewport = () => {
    const [width, setWidth] = useState(
        () => (typeof window !== 'undefined' && window.innerWidth) || 0,
    );

    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return width;
};
