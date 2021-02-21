import { useEffect, useState } from 'react';

/**
 * Returns debounced value so that value that has not changed for the last delay
 * of time
 * @param {*} value often changing value
 * @param {*} delay amount of time that needs to pass to confirm the value
 */
export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return debouncedValue;
}
