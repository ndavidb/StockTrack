'use client';

import { TextInput, Paper, Text, Group, Stack, UnstyledButton } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { searchCompanies } from '../../../../utils/data';
import { CompanySearch } from '../../../../types/FMPTypes';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';


export default function StockSearch() {
    const [searchData, setSearchData] = useState<CompanySearch[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async (value: string) => {
        setQuery(value);
        if (value.length < 1) {
            setSearchData([]);
            return;
        }
        
        setLoading(true);
        setShowResults(true);
        try {
            const results = await searchCompanies(value);
            if (Array.isArray(results)) {
                setSearchData(results);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStockSelect = (symbol: string) => {
        router.push(`/dashboard/stocks/${symbol}`);
        setShowResults(false);
    };

    return (
        <div ref={searchRef} style={{ position: 'relative', maxWidth: 400 }}>
            <TextInput
                placeholder="Search Stock"
                size="md"
                value={query}
                onChange={(event) => handleSearch(event.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                styles={{
                    input: {
                        '&:focus': {
                            borderColor: 'var(--mantine-color-blue-filled)',
                        },
                    },
                }}
            />
            
            {showResults && (searchData.length > 0 || loading) && (
                <Paper
                    shadow="md"
                    p="sm"
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 5px)',
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                    }}
                >
                    <Stack gap="xs">
                        {loading ? (
                            <Text size="sm" c="dimmed">Searching...</Text>
                        ) : (
                            searchData.map((item) => (
                                <UnstyledButton
                                    key={item.symbol}
                                    onClick={() => handleStockSelect(item.symbol)}
                                    p="xs"
                                    style={{
                                        borderRadius: 4,
                                        '&:hover': {
                                            backgroundColor: 'var(--mantine-color-gray-0)',
                                        },
                                    }}
                                >
                                    <Group justify="space-between" wrap="nowrap">
                                        <div>
                                            <Text fw={500}>{item.symbol}</Text>
                                            <Text size="sm" c="dimmed">{item.name}</Text>
                                        </div>
                                        <Text>{item.exchangeShortName}</Text>
                                    </Group>
                                </UnstyledButton>
                            ))
                        )}
                    </Stack>
                </Paper>
            )}
        </div>
    );
}
