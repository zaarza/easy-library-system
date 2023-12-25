import axios from 'axios';
import { deleteToken, getToken } from './token';
import { bookType } from '../types/bookTypes';

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

export const fetchBooks = async (parameters: { search?: string; page?: number }) => {
    const params: any = {};

    const parameterKeys = Object.keys(parameters) as Array<keyof typeof parameters>;
    parameterKeys.forEach((key) => {
        if (parameters[key] !== undefined) {
            params[key] = parameters[key];
        }
    });

    const response = await Axios.get('/api/books', {
        params,
    });

    return response;
};

export const postBook = async (data: {
    title: string;
    writter: string;
    publisher: string;
    year: number | string;
    location: string;
    code?: string;
}) => {
    const response = await Axios.post('/api/books', data);
    return response;
};

export const putBook = async (data: {
    id: string;
    title: string;
    writter: string;
    publisher: string;
    year: number | string;
    location: string;
    code?: string;
}) => {
    const response = await Axios.put(`/api/books/${data.id}`, data, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    });
    return response;
};

export const deleteBook = async (id: string) => {
    const response = await Axios.delete(`/api/books/${id}`);
    return response;
};
