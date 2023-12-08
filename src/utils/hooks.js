import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

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
                pattern: '/admin/add-user',
                view: 'addUser',
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
