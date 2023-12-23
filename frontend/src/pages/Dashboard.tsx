import {
    Box,
    Center,
    Flex,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { IoLibrary } from 'react-icons/io5';
import { FiRefreshCw } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import withAuth from '../hoc/withAuth';

ChartJS.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip);

const PanelItem = ({ icon, text, amount }: { icon: IconType; text: string; amount: number }) => {
    return (
        <HStack
            spacing='5'
            width='300px'
        >
            <Center
                bgColor='teal.500'
                p='16px'
                rounded='md'
            >
                <Icon
                    as={icon}
                    color='white'
                    boxSize={4}
                />
            </Center>
            <VStack alignItems='start'>
                <Text
                    color='teal'
                    fontWeight='600'
                    whiteSpace='nowrap'
                >
                    {text}
                </Text>
                <Text>{amount}</Text>
            </VStack>
        </HStack>
    );
};

const PanelItemData = [
    {
        icon: IoLibrary,
        text: 'Total buku',
        amount: 32,
    },
    {
        icon: FaUsers,
        text: 'Anggota',
        amount: 12,
    },
    {
        icon: FiRefreshCw,
        text: 'Buku yang sedang dipinjam',
        amount: 4,
    },
];

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    const data = {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
            {
                label: 'Pinjam',
                data: [12, 3, 4, 1, 6, 4, 3],
                backgroundColor: 'teal',
            },
            {
                label: 'Kembali',
                data: [12, 3, 4, 1, 6, 4, 3],
                backgroundColor: 'gray',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
        },
    };

    return (
        <Flex
            px='32px'
            py='32px'
            flexDir='column'
            rowGap='16px'
        >
            <Heading
                variant='h1'
                fontSize='24px'
            >
                Dashboard
            </Heading>

            <Flex
                width='100%'
                bgColor='white'
                rounded='md'
                px='32px'
                py='16px'
                columnGap='64px'
                justifyContent='space-between'
                overflowX='auto'
            >
                {PanelItemData.map((item, index) => (
                    <PanelItem
                        {...item}
                        key={index}
                    />
                ))}
            </Flex>

            <SimpleGrid
                column={{ md: 2, sm: 1 }}
                spacing='16px'
                minChildWidth='350px'
            >
                <Box
                    bgColor='white'
                    rounded='md'
                    p='16px'
                >
                    <Heading
                        variant='h2'
                        fontSize='16px'
                        textAlign='center'
                        color='gray.700'
                        pb='16px'
                    >
                        Sirkulasi perpustakaan dalam 7 hari
                    </Heading>
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    bgColor='white'
                    rounded='md'
                    p='16px'
                >
                    <Heading
                        variant='h2'
                        fontSize='16px'
                        textAlign='center'
                        color='gray.700'
                        pb='16px'
                    >
                        Aktivitas terakhir
                    </Heading>
                    <TableContainer maxHeight='300px'>
                        <Table
                            variant='striped'
                            colorScheme='gray'
                        >
                            <Thead>
                                <Tr>
                                    <Th>NAMA</Th>
                                    <Th>BUKU</Th>
                                    <Th>WAKTU</Th>
                                    <Th>PETUGAS</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>

                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>

                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>

                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>

                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>

                                <Tr>
                                    <Td>Edo Susilo</Td>
                                    <Td>MATEMATIKA</Td>
                                    <Td>9/12/23 20:14</Td>
                                    <Td>Edo Susilo</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </SimpleGrid>
        </Flex>
    );
};

const ProtectedDashboard = withAuth(Dashboard);
export default ProtectedDashboard;
