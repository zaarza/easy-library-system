import axios from 'axios';
import { deleteToken, getToken } from './token';

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
    },
});

export const validateToken = async () => {
    await Axios.get('/user/validate', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const authRequestInterceptor = Axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (!token) {
            window.location.replace('/login');
            return Promise.reject('Authentication required');
        }

        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authResponseInterceptor = Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { status: statusCode } = error.response;

        if (statusCode && statusCode === 401) {
            deleteToken(), window.location.replace('/login');
        }

        return Promise.reject(error);
    }
);

export const getLoggedIn = async (credentials: { username: string; password: string }) => {
    Axios.interceptors.request.eject(authRequestInterceptor);
    Axios.interceptors.response.eject(authResponseInterceptor);

    const response = await Axios.post('/api/users/login', credentials);
    return response;
};

export const fetchCurrentUser = async () => {
    const response = await Axios.get('/api/user');
    return response;
};
