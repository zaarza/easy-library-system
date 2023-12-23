import { Box, Button, Flex, Heading, Icon, IconButton, Text } from '@chakra-ui/react';
import { BiSolidBookReader } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { IconType } from 'react-icons';
import { IoLibrary, IoMenu } from 'react-icons/io5';
import { FiRefreshCw } from 'react-icons/fi';
import { FaFileSignature } from 'react-icons/fa';
import { LuHistory } from 'react-icons/lu';
import { TbLogout2 } from 'react-icons/tb';
import { CloseIcon } from '@chakra-ui/icons';

const SidebarLink = ({ active, icon, to, text }: { active?: boolean; icon: IconType; to: string; text: string }) => {
    return (
        <Box
            as='li'
            listStyleType='none'
            width='100%'
        >
            <Link to={to}>
                <Button
                    columnGap='32px'
                    rounded='lg'
                    px='32px'
                    py='24px'
                    colorScheme='teal'
                    variant={active ? 'solid' : 'ghost'}
                    width='100%'
                    isActive={active || false}
                    _active={{ bgColor: 'teal.500' }}
                    _hover={{ bgColor: 'teal.500', color: 'white' }}
                >
                    <Icon
                        as={icon}
                        boxSize={5}
                    />
                    <Text
                        fontWeight={active ? '600' : '500'}
                        w='100px'
                        textAlign='start'
                    >
                        {text}
                    </Text>
                </Button>
            </Link>
        </Box>
    );
};

const Sidebar = ({ show, hide }: { show: boolean; hide: () => void }) => {
    const { pathname: currentPath } = useLocation();

    return (
        <Flex
            borderRight='1px solid'
            borderRightColor='gray.300'
            bgColor='white'
            position={{ sm: 'fixed', md: 'sticky' }}
            top='0'
            left='0'
            display={show ? 'inherit' : 'none'}
            zIndex={1}
            height='100vh'
            bottom='0'
            width='280px'
            px='16px'
            py='8px'
            alignItems='start'
            flexDir='column'
            justifyContent='space-between'
        >
            <Flex
                columnGap='32px'
                height='fit-content'
                alignItems='center'
                px='32px'
                py='16px'
            >
                <Icon
                    as={BiSolidBookReader}
                    boxSize={8}
                    color='teal'
                />
                <Heading
                    variant='h1'
                    fontSize='16px'
                    color='teal'
                >
                    ELS V1
                </Heading>
                <IconButton
                    position='absolute'
                    right='16px'
                    display={{ sm: 'inherit', md: 'none' }}
                    aria-label='show menu'
                    icon={<Icon as={CloseIcon} />}
                    colorScheme='teal'
                    onClick={hide}
                />
            </Flex>

            <Flex
                as='ul'
                listStyleType='none'
                width='100%'
                flexDirection='column'
                rowGap='8px'
            >
                <SidebarLink
                    active={currentPath === '/'}
                    icon={MdSpaceDashboard}
                    text='Dashboard'
                    to='/'
                />

                <SidebarLink
                    active={currentPath === '/books'}
                    icon={IoLibrary}
                    text='Daftar Buku'
                    to='/books'
                />

                <SidebarLink
                    active={currentPath === '/circulation'}
                    icon={FiRefreshCw}
                    text='Sirkulasi'
                    to='/circulation'
                />

                <SidebarLink
                    active={currentPath === '/history'}
                    icon={LuHistory}
                    text='Riwayat'
                    to='/history'
                />
            </Flex>

            <SidebarLink
                active={false}
                icon={TbLogout2}
                text='Keluar'
                to='/logout'
            />
        </Flex>
    );
};

export default Sidebar;
