import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/books',
                element: <Books />,
            },
        ],
    },
]);

export default router;
