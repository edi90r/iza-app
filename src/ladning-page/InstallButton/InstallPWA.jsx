import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

function InstallPWA({ label }) {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    console.log(deferredPrompt);
    useEffect(() => {
        console.log('useEffect');
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later
            setDeferredPrompt(e);
        });
    }, []);

    const handleClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <button className='btn btn-primary text-pureWhite' onClick={handleClick}>
            {label}
        </button>
    );
}

InstallPWA.propTypes = {
    label: propTypes.string,
};

export default InstallPWA;
