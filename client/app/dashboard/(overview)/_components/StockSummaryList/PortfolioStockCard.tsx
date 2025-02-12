import React from "react";
import Image from "next/image";
import {Paper, Group, Text, Stack} from '@mantine/core';

interface Props {
    companyName: string;
    website: string;
    purchasePrice: number;
    performance: number;
}

const PortfolioStockCard: React.FC<StockPortfolioPerformance> = ({
                                                                     companyName,
                                                                     website,
                                                                     purchasePrice,
                                                                     performance
                                                                 }: Props) => {
    return (
        <Paper
            shadow="xs"
            p="md"
            withBorder
            style={{transition: 'box-shadow 150ms ease'}}
            pos="relative"
            className="hover:shadow-md"
        >
            <Group mb="sm">
                <Image
                    src={`https://img.logo.dev/${website}?token=pk_H-H7gJdRR3qZgFO4dEkKtw`}
                    alt={`${companyName} logo`}
                    width={24}
                    height={24}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `/api/placeholder/24/24?text=${companyName[0]}`;
                    }}
                />
                <Text fw={600}>{companyName}</Text>
            </Group>

            <Group justify="space-between">
                <Stack gap={0}>
                    <Text size="sm" c="dimmed">Current Price</Text>
                    <Text fw={600} size="sm">${purchasePrice.toFixed(2)}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text size="sm" c="dimmed">Performance</Text>
                    <Text
                        fw={600}
                        size="sm"
                        c={performance >= 0 ? 'green' : 'red'}
                    >
                        {performance.toFixed(2)}% {performance >= 0 ? '▲' : '▼'}
                    </Text>
                </Stack>
            </Group>
        </Paper>
    );
}

export default PortfolioStockCard;