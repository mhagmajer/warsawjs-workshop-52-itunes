import {
    Button,
    Image,
    Input,
    Stack,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

// https://itunes.apple.com/search?term=harry&entity=ebook

export function Itunes() {
    const [results, setResults] = useState([]);
    const [searchTermInput, setSearchTermInput] = useState('');

    return (
        <Stack>
            <Stack direction="row">
                <Input
                    value={searchTermInput}
                    onChange={(event) => setSearchTermInput(event.target.value)}
                />
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        (async () => {
                            const response = await fetch(
                                `https://itunes.apple.com/search?term=${encodeURIComponent(
                                    searchTermInput
                                )}&entity=ebook`
                            );
                            const data = await response.json();

                            setResults(data.results);
                        })();
                    }}
                >
                    Search
                </Button>
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
                    <Tr>
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
