import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Skeleton,
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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchBooks } from '../utils/fetcher';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AddNewBookButton, DetailBookModal } from '../components/modals/BookPageModals';
import { bookType } from '../types/bookTypes';

const initialBooksData = {
    current_page: 1,
    data: [],
    last_page: 1,
    total: 0,
};

const Books = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const { isOpen: isOpenDetailModal, onOpen: onOpenDetailModal, onClose: onCloseDetailModal } = useDisclosure();
    const [booksData, setBooksData] = useState<{
        current_page: number;
        data: bookType[];
        last_page: number;
        total: number;
    }>(initialBooksData);

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [selectedData, setSelectedData] = useState<bookType | null>(null);

    const onChangeSearchQuery = (event: { target: { value: string } }) => {
        setSearchQuery(event.target.value);
    };

    const onOpenDetailModalHandler = (data: any) => {
        setSelectedData(data);
        onOpenDetailModal();
    };

    const getBooks = async (reset: boolean = false) => {
        try {
            const { data } = await fetchBooks({ search: searchQuery || '', page });

            const { current_page, data: dataResponse, last_page, total } = data;
            if (reset) {
                setPage(1);
                setBooksData({ current_page, data: dataResponse, last_page, total });
            } else {
                setBooksData({ current_page, last_page, total, data: [...booksData.data, ...dataResponse] });
            }
            setHasMore(current_page < last_page ? true : false);
        } catch (error) {
            console.error('Unexpected error', error);
        }

        setInitialLoading(false);
    };

    const searchSubmitHandler = (event: any) => {
        event.preventDefault();
        setInitialLoading(true);
        setSearchParams({ search: searchQuery });
        getBooks(true);
    };

    useEffect(() => {
        document.title = 'Daftar Buku';
    }, []);

    useEffect(() => {
        getBooks();
    }, [page]);

    return (
        <>
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
                    Daftar Buku
                </Heading>

                <form onSubmit={searchSubmitHandler}>
                    <InputGroup columnGap='16px'>
                        <Input
                            maxWidth='500px'
                            type='tel'
                            bgColor='white'
                            border='none'
                            value={searchQuery}
                            onChange={onChangeSearchQuery}
                            placeholder='Cari berdasarkan judul, penulis, penerbit atau kode buku'
                        />
                        <InputRightAddon p='0'>
                            <IconButton
                                type='submit'
                                aria-label='Cari buku'
                                colorScheme='teal'
                                icon={<SearchIcon />}
                            />
                        </InputRightAddon>
                    </InputGroup>
                </form>

                <AddNewBookButton callback={() => getBooks(true)} />

                <InfiniteScroll
                    loader={
                        <Text
                            textAlign='center'
                            p='32px'
                            color='gray.500'
                            fontWeight='bold'
                        >
                            MEMUAT
                        </Text>
                    }
                    next={() => setPage(page + 1)}
                    dataLength={booksData.data.length}
                    hasMore={hasMore}
                >
                    <TableContainer
                        rounded='md'
                        border='1px solid'
                        borderColor='gray.200'
                        overflowX='auto'
                    >
                        <Table
                            variant='striped'
                            bgColor='white'
                        >
                            <Thead>
                                <Tr>
                                    <Th>KODE</Th>
                                    <Th>JUDUL</Th>
                                    <Th>PENULIS</Th>
                                    <Th>PENERBIT</Th>
                                    <Th>TAHUN</Th>
                                    <Th>LOKASI</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {initialLoading &&
                                    Array.from({ length: 10 }).map((_, index) => (
                                        <Tr key={index}>
                                            {Array.from({ length: 6 }).map((_, index) => (
                                                <Td key={index}>
                                                    <Skeleton height='20px' />{' '}
                                                </Td>
                                            ))}
                                        </Tr>
                                    ))}
                                {booksData.data.length > 0 &&
                                    booksData.data.map((book: any, index) => (
                                        <Tr
                                            key={index}
                                            cursor='pointer'
                                            onClick={() => onOpenDetailModalHandler(book)}
                                        >
                                            <Td>{book.code}</Td>
                                            <Td>{book.title}</Td>
                                            <Td>{book.writter}</Td>
                                            <Td>{book.publisher}</Td>
                                            <Td>{book.year}</Td>
                                            <Td>{book.location}</Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </InfiniteScroll>
            </Flex>

            <DetailBookModal
                isOpen={isOpenDetailModal}
                onClose={onCloseDetailModal}
                data={selectedData}
                callback={() => getBooks(true)}
            />
        </>
    );
};

export default Books;
