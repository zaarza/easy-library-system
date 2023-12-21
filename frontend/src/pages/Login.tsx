import { AtSignIcon, LockIcon, SearchIcon } from '@chakra-ui/icons';
import { BiSolidBookReader } from 'react-icons/bi';
import {
    Alert,
    AlertDescription,
    AlertIcon,
    Box,
    Button,
    CloseButton,
    Container,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getLoggedIn } from '../utils/fetcher';
import { putToken } from '../utils/token';
import withGuest from '../hoc/withGuest';

const BookListButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                onClick={onOpen}
                w='100%'
                fontWeight='normal'
            >
                Lihat Daftar Buku
            </Button>

            <Modal
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Daftar Buku</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        rowGap='16px'
                    >
                        <InputGroup size='sm'>
                            <Input placeholder='Cari berdasarkan judul, penulis, penerbit buku...' />
                            <InputRightAddon as='button'>
                                <SearchIcon />
                            </InputRightAddon>
                        </InputGroup>
                        <TableContainer>
                            <Table
                                variant='striped'
                                colorScheme='gray'
                            >
                                <Thead>
                                    <Tr>
                                        <Th>JUDUL</Th>
                                        <Th>PENULIS</Th>
                                        <Th>PENERBIT</Th>
                                        <Th>TAHUN</Th>
                                        <Th>LOKASI</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>MATEMATIKA KELAS 10</Td>
                                        <Td>Edo Slamet</Td>
                                        <Td>EDUBOOK</Td>
                                        <Td>2019</Td>
                                        <Td>A1</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

const Login = () => {
    const loginForm = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username wajib diisi.'),
            password: Yup.string().required('Password wajib diisi.'),
        }),
        validateOnMount: false,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (currentValue, formik) => {
            formik.setStatus(undefined);

            try {
                const { data } = await getLoggedIn(currentValue);
                putToken(data.token);
                window.location.replace('/');
            } catch (error: any) {
                const { status: StatusCode, data } = error.response;

                if (StatusCode) {
                    switch (StatusCode) {
                        case 401:
                            formik.setStatus('Username atau kata sandi salah!');
                            break;
                        case 422:
                            formik.setErrors(data);
                            break;
                        default:
                            console.error(error);
                            return;
                    }
                }

                console.error(error);
            }
        },
    });

    return (
        <>
            <Container
                maxWidth='8xl'
                p='0px'
            >
                <SimpleGrid
                    columns={{ sm: 1, md: 2 }}
                    w='100%'
                >
                    <Flex
                        rowGap='32px'
                        flexDir='column'
                        p={{ md: '64px', base: '32px' }}
                        bgColor={'gray.200'}
                        height={{ md: '100vh' }}
                        justifyContent='space-between'
                        background='linear-gradient(rgba(0,0,0, 0.6), rgba(0,0,0, 0.6)), url(/assets/images/cover.jpg) center/cover no-repeat'
                    >
                        <Flex
                            columnGap='16px'
                            alignItems='center'
                        >
                            <Icon
                                as={BiSolidBookReader}
                                boxSize={8}
                                color='white'
                            />
                            <Text
                                variant='h1'
                                fontSize='16px'
                                color='white'
                                fontWeight='600'
                            >
                                ELS V1
                            </Text>
                        </Flex>

                        <Heading
                            variant='h1'
                            color='teal.200'
                        >
                            Selamat Datang di Perpustakaan!
                        </Heading>
                        <Text
                            color='white'
                            as='i'
                        >
                            "Buku adalah jendela dunia di mana kita bisa melihat isi dunia tanpa melakukan perjalanan,
                            hanya cukup membaca sebuah halaman."
                        </Text>
                    </Flex>
                    <form onSubmit={loginForm.handleSubmit}>
                        <Flex
                            bgColor={'white'}
                            height={{ md: '100vh' }}
                            flexDir={'column'}
                            p={{ md: '64px', base: '32px' }}
                            justifyContent='space-between'
                            rowGap={'16px'}
                        >
                            <Flex
                                flexDir={'column'}
                                rowGap={'16px'}
                            >
                                <Heading variant='h1'>Login</Heading>
                                <Heading
                                    variant='h2'
                                    fontWeight={'normal'}
                                    fontSize={'16px'}
                                    color='gray'
                                >
                                    Silahkan login untuk memulai meminjam buku.
                                </Heading>
                            </Flex>

                            <Flex
                                flexDir={'column'}
                                rowGap={'16px'}
                            >
                                {loginForm.status && (
                                    <Alert status='error'>
                                        <AlertIcon />
                                        <Box>
                                            <AlertDescription>{loginForm.status}</AlertDescription>
                                        </Box>
                                        <Spacer />
                                        <CloseButton
                                            alignSelf='flex-start'
                                            position='relative'
                                            right={-1}
                                            top={-1}
                                            onClick={() => loginForm.setStatus(undefined)}
                                        />
                                    </Alert>
                                )}
                                <FormControl
                                    isInvalid={
                                        loginForm.errors?.username ? loginForm.errors?.username.length > 0 : false
                                    }
                                >
                                    <FormLabel>Username</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                        >
                                            <AtSignIcon />
                                        </InputLeftElement>
                                        <Input
                                            placeholder='Username'
                                            {...loginForm.getFieldProps('username')}
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{loginForm.errors.username}</FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    isInvalid={
                                        loginForm.errors?.password ? loginForm.errors?.password.length > 0 : false
                                    }
                                >
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                        >
                                            <LockIcon />
                                        </InputLeftElement>
                                        <Input
                                            placeholder='Password'
                                            type='password'
                                            {...loginForm.getFieldProps('password')}
                                        />
                                    </InputGroup>
                                    <FormErrorMessage>{loginForm.errors.password}</FormErrorMessage>
                                </FormControl>

                                <Button
                                    colorScheme='teal'
                                    type='submit'
                                    isLoading={loginForm.isSubmitting}
                                >
                                    Login
                                </Button>
                            </Flex>
                            <BookListButton />
                        </Flex>
                    </form>
                </SimpleGrid>
            </Container>
        </>
    );
};

const GuestLogin: any = withGuest(Login);
export default GuestLogin;
