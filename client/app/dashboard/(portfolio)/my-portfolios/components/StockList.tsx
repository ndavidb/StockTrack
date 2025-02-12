'use client';

import { Table, Avatar, Text, Card } from '@mantine/core';

interface Stock {
  symbol: string;
  logo: string;
  purchaseDate: string;
}

interface StockListProps {
  stocks: Stock[];
}

export function StockList({ stocks }: StockListProps) {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">My Stocks</Text>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Stock</Table.Th>
            <Table.Th>Purchase date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {stocks.map((stock) => (
            <Table.Tr key={stock.symbol}>
              <Table.Td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Avatar size="sm" src={stock.logo} />
                  <Text>{stock.symbol}</Text>
                </div>
              </Table.Td>
              <Table.Td>{stock.purchaseDate}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
}
