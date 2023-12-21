import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { getToken } from './../utils/token';
import { useNavigate } from 'react-router-dom';

const withGuest = (WrappedComponent: any) => {
    const HOC = (props: any) => {
        const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState<boolean>(true);

        useEffect(() => {
            if (getToken() !== null) {
                navigate('/');
                return;
            }

            setIsLoading(false);
        }, []);

        if (!isLoading) {
            return <WrappedComponent {...props} />;
        }
    };
    return HOC;
};

export default withGuest;
