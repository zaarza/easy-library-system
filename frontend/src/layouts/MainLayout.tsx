import { Box, Flex, useBoolean } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from './../components/Sidebar';
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../utils/fetcher';
import { useDispatch, useSelector } from 'react-redux';
import { storeUser } from '../store/reducers/app';

const MainLayout = () => {
    const [showSidebar, setSidebar] = useBoolean(true);
    const [isLoading, setIsLoading] = useState(true);
    const appStore = useSelector((state: any) => state.app);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCurrentUser()
            .then((response) => {
                const { data } = response;
                dispatch(storeUser(data));
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Unexpected error', error);
            });
    }, []);

    if (!isLoading)
        return (
            <Flex position='relative'>
                <Sidebar
                    show={showSidebar}
                    hide={setSidebar.off}
                />
                <Box
                    bgColor='gray.100'
                    width='100%'
                    overflow='hidden'
                >
                    <Topbar toggleSidebar={setSidebar.toggle} />
                    <Outlet />
                </Box>
            </Flex>
        );
};

export default MainLayout;
