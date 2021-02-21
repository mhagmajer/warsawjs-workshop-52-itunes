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
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
