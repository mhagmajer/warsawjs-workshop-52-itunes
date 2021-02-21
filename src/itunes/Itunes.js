import {
    Button,
    Input,
    Stack,
    Table,
    Thead,
    Tbody,
    Image,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';

// https://itunes.apple.com/search?term=harry&entity=ebook

export function Itunes() {
    const [results, setResults] = useState([]);
    useEffect(() => {
        (async () => {
            const searchTerm = 'abc';
            const response = await fetch(
                `https://itunes.apple.com/search?term=${encodeURIComponent(
                    searchTerm
                )}&entity=ebook`
            );
            const data = await response.json();

            setResults(data.results);
        })();
    }, []);

    return (
        <Stack>
            <Stack direction="row">
                <Input />
                <Button colorScheme="blue">Search</Button>
            </Stack>
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
        </Stack>
    );
}
