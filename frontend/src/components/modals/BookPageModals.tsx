import { DeleteIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Flex,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    ModalFooter,
    Spacer,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    IconButton,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { deleteBook, postBook, putBook } from '../../utils/fetcher';

export const DeleteBookButton = ({ id, callback }: { id: string; callback: () => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const toast = useToast();

    const deleteHandler = async () => {
        if (!id) return;

        console.log(id);
        try {
            const { data } = await deleteBook(id);

            toast({
                status: 'success',
                title: 'Proses Berhasil',
                description: 'Data berhasil dihapus.',
                isClosable: true,
            });
            onClose();
            callback();
        } catch (error) {
            toast({
                status: 'error',
                title: 'Proses Gagal',
                description: 'Data gagal dihapus, harap laporkan ke admin.',
                isClosable: true,
            });
        }
    };

    return (
        <>
            <IconButton
                colorScheme='red'
                aria-label='Hapus buku'
                icon={<DeleteIcon />}
                onClick={onOpen}
            />

            <AlertDialog
                isCentered
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontSize='lg'
                            fontWeight='bold'
                        >
                            Hapus Buku
                        </AlertDialogHeader>

                        <AlertDialogBody>Apakah anda yakin ingin menghapus buku ini?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onClose}
                            >
                                Batal
                            </Button>
                            <Button
                                colorScheme='red'
                                ml={3}
                                onClick={deleteHandler}
                            >
                                Hapus
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export const DetailBookModal = ({
    isOpen,
    onClose,
    data,
    callback,
}: {
    isOpen: boolean;
    onClose: () => void;
    callback: () => void;
    data: {
        id: string;
        title: string;
        writter: string;
        publisher: string;
        year: number;
        location: string;
        code: string;
    } | null;
}) => {
    const toast = useToast();
    const updateBookDetailForm = useFormik({
        initialValues: {
            title: data?.title || '',
            writter: data?.writter || '',
            publisher: data?.publisher || '',
            year: data?.year || 0,
            location: data?.location || '',
            code: data?.code || '',
        },
        enableReinitialize: true,
        onSubmit: async (value, formik) => {
            if (data === null) return;
            try {
                const { data: responseData } = await putBook({ id: data.id, ...value });
                onClose();
                toast({
                    title: 'Proses Berhasil!',
                    status: 'success',
                    description: 'Data berhasil diperbarui.',
                    isClosable: true,
                });
                callback();
            } catch (error: any) {
                const { status: statusCode, data } = error.response;

                if (statusCode) {
                    switch (statusCode) {
                        case 422:
                            formik.setErrors(data.errors);
                            toast({
                                title: 'Proses Gagal!',
                                status: 'error',
                                description: 'Terjadi kesalahan, harap periksa data.',
                                isClosable: true,
                            });
                            break;
                        default:
                            toast({
                                title: 'Proses Gagal!',
                                status: 'error',
                                description: 'Terjadi kesalahan pada server, harap laporkan ke admin',
                                isClosable: true,
                            });
                            console.log('Unexpected error', error);
                    }
                } else {
                    toast({
                        title: 'Proses Gagal!',
                        status: 'error',
                        description: 'Terjadi kesalahan pada server, harap laporkan ke admin',
                        isClosable: true,
                    });
                }
            }
        },
    });

    return (
        <>
            <Modal
                isCentered
                isOpen={isOpen && data !== null}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detail</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={updateBookDetailForm.handleSubmit}>
                            <Flex
                                direction='column'
                                rowGap='16px'
                            >
                                <FormControl isInvalid={updateBookDetailForm.errors?.title ? true : false}>
                                    <FormLabel>Judul</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Judul'
                                        {...updateBookDetailForm.getFieldProps('title')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.title}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={updateBookDetailForm.errors?.writter ? true : false}>
                                    <FormLabel>Penulis</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Penulis'
                                        {...updateBookDetailForm.getFieldProps('writter')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.writter}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={updateBookDetailForm.errors?.publisher ? true : false}>
                                    <FormLabel>Penerbit</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Penerbit'
                                        {...updateBookDetailForm.getFieldProps('publisher')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.publisher}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={updateBookDetailForm.errors?.year ? true : false}>
                                    <FormLabel>Tahun</FormLabel>
                                    <Input
                                        type='number'
                                        placeholder='Tahun'
                                        {...updateBookDetailForm.getFieldProps('year')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.year}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={updateBookDetailForm.errors?.location ? true : false}>
                                    <FormLabel>Lokasi</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Lokasi'
                                        {...updateBookDetailForm.getFieldProps('location')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.location}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={updateBookDetailForm.errors?.code ? true : false}>
                                    <FormLabel>Kode Buku (Opsional)</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Kode Buku'
                                        {...updateBookDetailForm.getFieldProps('code')}
                                    />
                                    <FormErrorMessage>{updateBookDetailForm.errors.code}</FormErrorMessage>
                                </FormControl>

                                <ModalFooter p='0'>
                                    <DeleteBookButton
                                        id={data?.id || ''}
                                        callback={() => {
                                            callback();
                                            onClose();
                                        }}
                                    />
                                    <Spacer />
                                    <Button
                                        mr={3}
                                        onClick={onClose}
                                    >
                                        Batal
                                    </Button>
                                    <Button
                                        variant='solid'
                                        colorScheme='teal'
                                        type='submit'
                                        isLoading={updateBookDetailForm.isSubmitting}
                                    >
                                        Simpan Perubahan
                                    </Button>
                                </ModalFooter>
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export const AddNewBookButton = ({ callback }: { callback: () => void }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const addNewBookForm = useFormik({
        initialValues: {
            title: '',
            writter: '',
            publisher: '',
            year: '',
            location: '',
            code: '',
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (value, formik) => {
            formik.setStatus(undefined);
            try {
                const { data } = await postBook(value);
                toast({
                    title: 'Proses Berhasil!',
                    status: 'success',
                    description: 'Data ditambahkan',
                    isClosable: true,
                });
                onClose();
                formik.resetForm();
                callback();
            } catch (error: any) {
                const { status: statusCode, data } = error.response;

                if (statusCode) {
                    switch (statusCode) {
                        case 422:
                            formik.setErrors(data.errors);
                            toast({
                                title: 'Proses Gagal!',
                                status: 'error',
                                description: 'Terjadi kesalahan, harap periksa data.',
                                isClosable: true,
                            });
                            break;
                        default:
                            toast({
                                title: 'Proses Gagal!',
                                status: 'error',
                                description: 'Terjadi kesalahan pada server, harap laporkan ke petugas',
                                isClosable: true,
                            });
                            console.log('Unexpected error', error);
                    }
                } else {
                    toast({
                        title: 'Proses Gagal!',
                        status: 'error',
                        description: 'Terjadi kesalahan pada server, harap laporkan ke petugas',
                        isClosable: true,
                    });
                }
            }
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Judul diperlukan'),
            writter: Yup.string().required('Nama penulis diperlukan'),
            publisher: Yup.string().required('Penerbit diperlukan'),
            year: Yup.string().required('Tahun diperlukan'),
            code: Yup.string().optional(),
            location: Yup.string().required('Lokasi diperlukan'),
        }),
    });

    return (
        <>
            <Button
                colorScheme='teal'
                w='fit-content'
                onClick={onOpen}
            >
                Tambah Buku
            </Button>

            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Tambah Buku Baru</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={addNewBookForm.handleSubmit}>
                            <Flex
                                direction='column'
                                rowGap='16px'
                            >
                                <FormControl isInvalid={addNewBookForm.errors?.title ? true : false}>
                                    <FormLabel>Judul</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Judul'
                                        {...addNewBookForm.getFieldProps('title')}
                                    />
                                    <FormErrorMessage>{addNewBookForm.errors.title}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={addNewBookForm.errors?.writter ? true : false}>
                                    <FormLabel>Penulis</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Penulis'
                                        {...addNewBookForm.getFieldProps('writter')}
                                    />
                                    <FormErrorMessage>{addNewBookForm.errors.writter}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={addNewBookForm.errors?.publisher ? true : false}>
                                    <FormLabel>Penerbit</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Penerbit'
                                        {...addNewBookForm.getFieldProps('publisher')}
                                    />
                                    <FormErrorMessage>{addNewBookForm.errors.publisher}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={addNewBookForm.errors?.year ? true : false}>
                                    <FormLabel>Tahun</FormLabel>
                                    <NumberInput>
                                        <NumberInputField
                                            placeholder='Tahun'
                                            {...addNewBookForm.getFieldProps('year')}
                                        />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                    <FormErrorMessage>{addNewBookForm.errors.year}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={addNewBookForm.errors?.location ? true : false}>
                                    <FormLabel>Lokasi</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Lokasi'
                                        {...addNewBookForm.getFieldProps('location')}
                                    />
                                    <FormErrorMessage>{addNewBookForm.errors.location}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={addNewBookForm.errors?.code ? true : false}>
                                    <FormLabel>Kode Buku (Opsional)</FormLabel>
                                    <Input
                                        type='text'
                                        placeholder='Kode Buku'
                                        {...addNewBookForm.getFieldProps('code')}
                                    />
                                    <FormErrorMessage>{addNewBookForm.errors.code}</FormErrorMessage>
                                </FormControl>
                            </Flex>

                            <ModalFooter pr='0'>
                                <Button
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    variant='solid'
                                    colorScheme='teal'
                                    type='submit'
                                >
                                    Buat
                                </Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
