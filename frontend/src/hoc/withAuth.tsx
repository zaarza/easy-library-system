import { getToken } from './../utils/token';
import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: any) => {
    const HOC = (props: any) => {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const token = getToken();
            if (!token) {
                window.location.replace('/login');
            } else {
                setIsLoading(false);
            }
        }, []);

        if (!isLoading) return <WrappedComponent {...props} />;
    };

    return HOC;
};

export default withAuth;
