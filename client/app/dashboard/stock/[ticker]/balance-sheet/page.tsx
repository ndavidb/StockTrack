"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanyBalanceSheet } from "../../../../../actions/stocks.action";
import { CompanyBalanceSheet } from "../../../../../types/FMPTypes";
import {
  Card,
  Grid,
  Table,
  Title,
  Text,
  Skeleton,
  Group,
  Center,
  Container,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function BalanceSheetPage() {
  const { ticker } = useParams();
  const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyBalanceSheet(ticker as string);
        if (Array.isArray(data)) {
          setBalanceSheet(data);
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch balance sheet data",
          color: "red",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  if (loading) {
    return (
      <Container mt="lg" size="fluid">
        <Skeleton height={500} />
      </Container>
    );
  }

  const latestData = balanceSheet[0];

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box py="sm">
      <Grid mb="sm">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Total Assets
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.totalAssets || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Total Liabilities
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.totalLiabilities || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Total Equity
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.totalEquity || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Working Capital
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(
                (latestData?.totalCurrentAssets || 0) -
                  (latestData?.totalCurrentLiabilities || 0)
              )}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card withBorder shadow="sm">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Metric</Table.Th>
              {balanceSheet.slice(0, 4).map((sheet) => (
                <Table.Th key={sheet.date}>
                  {new Date(sheet.date).getFullYear()}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { label: "Cash & Equivalents", key: "cashAndCashEquivalents" },
              { label: "Short Term Investments", key: "shortTermInvestments" },
              { label: "Net Receivables", key: "netReceivables" },
              { label: "Inventory", key: "inventory" },
              { label: "Total Current Assets", key: "totalCurrentAssets" },
              {
                label: "Property & Equipment",
                key: "propertyPlantEquipmentNet",
              },
              { label: "Long Term Investments", key: "longTermInvestments" },
              { label: "Total Assets", key: "totalAssets" },
              { label: "Accounts Payable", key: "accountPayables" },
              { label: "Short Term Debt", key: "shortTermDebt" },
              {
                label: "Total Current Liabilities",
                key: "totalCurrentLiabilities",
              },
              { label: "Long Term Debt", key: "longTermDebt" },
              { label: "Total Liabilities", key: "totalLiabilities" },
              { label: "Retained Earnings", key: "retainedEarnings" },
              {
                label: "Total Stockholder Equity",
                key: "totalStockholdersEquity",
              },
            ].map(({ label, key }) => (
              <Table.Tr key={key}>
                <Table.Td fw={600}>{label}</Table.Td>
                {balanceSheet.slice(0, 4).map((sheet) => (
                  <Table.Td key={sheet.date}>
                    {formatValue(
                      sheet[key as keyof CompanyBalanceSheet] as number
                    )}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Box>
  );
}
