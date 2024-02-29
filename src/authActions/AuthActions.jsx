import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthActions = ({ children }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    let mode = searchParams.get('mode');
    let oobCode = searchParams.get('oobCode');

    if (mode === 'resetPassword' && oobCode) {
        const resetPasswordPath = `/confirm-reset-password?oobCode=${oobCode}`;

        return navigate(resetPasswordPath);
    }

    return children;
};

export default AuthActions;
