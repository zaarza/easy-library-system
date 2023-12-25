import { Avatar, AvatarBadge, Flex, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { IoMenu } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    const { user } = useSelector((state: any) => state.app);

    const renderUserRole = (id: number): string => {
        switch (id) {
            case 1:
                return 'Admin';
            case 2:
                return 'Petugas';
            default:
                return 'Anggota';
        }
    };

    return (
        <HStack
            justifyContent='space-between'
            px='32px'
            py='16px'
            bgColor='white'
            borderBottom='1px solid'
            borderBottomColor='gray.300'
        >
            <IconButton
                aria-label='show menu'
                icon={<Icon as={IoMenu} />}
                colorScheme='teal'
                onClick={toggleSidebar}
            />

            <HStack
                spacing='7'
                bgColor='white'
                rounded='md'
            >
                <Avatar size='sm'>
                    <AvatarBadge
                        boxSize='1.25em'
                        bg='green.500'
                    />
                </Avatar>{' '}
                <Flex flexDir='column'>
                    <Text
                        fontSize='16px'
                        fontWeight='600'
                        color='teal'
                    >
                        {user.name}
                    </Text>
                    <Text fontSize='12px'>{renderUserRole(user.role_id)}</Text>
                </Flex>
            </HStack>
        </HStack>
    );
};

export default Topbar;
