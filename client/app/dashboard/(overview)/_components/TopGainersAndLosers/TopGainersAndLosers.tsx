"use client";

import {
  Container,
  Group,
  Title,
  Text,
  Table,
  Flex,
  ScrollArea,
  NumberFormatter,
  Box,
} from "@mantine/core";
import { useState } from "react";

import classes from "./TopGainersAndLosers.module.css";

interface StockTablesProps {
  metadata: string;
  last_updated: string;
  top_gainers: TickerData[];
  top_losers: TickerData[];
  most_actively_traded: TickerData[];
}

export default function TopGainersAndLossers({
  metadata,
  last_updated,
  top_gainers,
  top_losers,
  most_actively_traded,
}: StockTablesProps) {
  const [scrolled, setScrolled] = useState(false);

  const renderTable = (data: TickerData[], title: string) => (
    <Box w="30%">
      <ScrollArea h={265} scrollbarSize={4}>
        <Title
          ta="center"
          order={4}
          bg="var(--mantine-color-primary-6)"
          py="xs"
          c="white"
        >
          {title}
        </Title>

        <Table striped stickyHeader highlightOnHover r="sm" w="100%">
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Ticker</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Change Percentage</Table.Th>
              <Table.Th>Volume</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item.ticker}</Table.Td>
                <Table.Td>{item.price}</Table.Td>
                <Table.Td>{item.change_percentage}</Table.Td>
                <Table.Td>
                  <NumberFormatter
                    prefix="$ "
                    thousandSeparator
                    value={item.volume}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );

  return (
    <Container fluid>
      <Group py="lg">
        <Title order={2}>Top Gainers, Losers, Most Actively Traded</Title>
        <Text>Last updated: {last_updated}</Text>
      </Group>
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        align="stretch"
        gap={{ base: "lg", sm: "md" }}
        wrap={{ base: "wrap", sm: "nowrap" }}
      >
        {renderTable(top_gainers, "Gainers")}
        {renderTable(top_losers, "Losers")}
        {renderTable(most_actively_traded, "Most Actively Traded")}
      </Flex>
    </Container>
  );
}
