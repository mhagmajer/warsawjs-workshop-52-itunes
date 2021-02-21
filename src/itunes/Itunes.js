import {
    Button,
    CircularProgress,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableCaption,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks';

// https://itunes.apple.com/search?term=harry&entity=ebook

async function fetchBooks({ searchTermInput, setResults, setIsLoading }) {
    if (searchTermInput === '') {
        return;
    }

    setIsLoading(true);
    try {
        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTermInput
            )}&entity=ebook`
        );
        const data = await response.json();

        setResults(data.results);
    } finally {
        setIsLoading(false);
    }
}

const words = ['paris', 'barcelona', 'berlin', 'tokyo', 'rome'];

// returns list of suggested queries
function getSuggestions(searchTerm) {
    if (!searchTerm) {
        return [];
    }
    return words.filter((word) => word.startsWith(searchTerm));
}

export function Itunes() {
    const [results, setResults] = useState([]);
    const [searchTermInput, setSearchTermInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    // auto loading of the data
    const debouncedSearchTerm = useDebounce(searchTermInput, 500);

    useEffect(() => {
        fetchBooks({
            searchTermInput: debouncedSearchTerm,
            setResults,
            setIsLoading,
        });
    }, [debouncedSearchTerm]);

    const suggestionsForInput = getSuggestions(searchTermInput);
    useEffect(() => {
        setSuggestions(suggestionsForInput);
    }, [suggestionsForInput.join('')]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Stack>
            <Stack direction="row">
                <Input
                    value={searchTermInput}
                    onChange={(event) => setSearchTermInput(event.target.value)}
                />
                {isLoading && (
                    <CircularProgress
                        isIndeterminate
                        color="green.300"
                        size={10}
                    />
                )}
                <Button
                    colorScheme="blue"
                    onClick={() =>
                        fetchBooks({
                            searchTermInput,
                            setResults,
                            setIsLoading,
                        })
                    }
                >
                    Search
                </Button>
            </Stack>
            <Stack direction="row">
                {suggestions.map((suggestion) => (
                    <Tag key={suggestion}>{suggestion}</Tag>
                ))}
            </Stack>
            <ItunesTable results={results} />
        </Stack>
    );
}

function ItunesTable({ results }) {
    return (
        <Table variant="simple">
            <TableCaption>iTunes Ebooks</TableCaption>
            <Thead>
                <Tr>
                    <Th>Artwork</Th>
                    <Th>Name</Th>
                    <Th isNumeric>Price</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {results.map((result) => (
                    <Tr key={result.trackId}>
                        <Td>
                            <Image src={result.artworkUrl60} />
                        </Td>
                        <Td>{result.trackName}</Td>
                        <Td isNumeric>{result.price}</Td>
                        <Td>
                            <DescriptionModal result={result} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

function DescriptionModal({ result }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">
                Open Modal
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        dangerouslySetInnerHTML={{ __html: result.description }}
                    />
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
