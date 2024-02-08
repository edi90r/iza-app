export const routes = [
    { path: '/admin', breadcrumb: 'dashboard' },

    { path: '/admin/add-user/personal-data', breadcrumb: 'dane osobowe' },
    { path: '/admin/add-user/contact-data', breadcrumb: 'dane kontaktowe' },
    { path: '/admin/add-user/register', breadcrumb: 'zarejestruj użytkownika' },
    { path: '/admin/add-user/summary', breadcrumb: 'podsumowanie' },
    { path: '/admin/user-details/:id', breadcrumb: 'użytkownik' },
    { path: '/admin/user-details/:id/edit', breadcrumb: 'edytuj użytkownika' },
    { path: '/admin/user-details/:id/edit-credentials', breadcrumb: 'przywróć hasło' },
];
