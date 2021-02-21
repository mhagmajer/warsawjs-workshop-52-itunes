import { Button, Stack, Tag } from '@chakra-ui/react';

import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);
    return (
        <Stack direction="row">
            <Tag>{count}</Tag>
            <Button colorScheme="green" onClick={() => setCount(count + 1)}>
                +
            </Button>
            <Button colorScheme="red" onClick={() => setCount(count - 1)}>
                -
            </Button>
        </Stack>
    );
}
