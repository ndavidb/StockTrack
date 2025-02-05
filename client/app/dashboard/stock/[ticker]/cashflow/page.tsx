"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanyCashFlow } from "../../../../../actions/stocks.action";
import { CompanyCashFlow } from "../../../../../types/FMPTypes";
import {
  Card,
  Grid,
  Table,
  Title,
  Text,
  Skeleton,
  Box,
  Container,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function CashFlowPage() {
  const { ticker } = useParams();
  const [cashFlow, setCashFlow] = useState<CompanyCashFlow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyCashFlow(ticker as string);
        if (Array.isArray(data)) {
          setCashFlow(data);
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch cash flow data",
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

  const latestData = cashFlow[0];

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box p="sm">
      <Grid mb="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card withBorder padding="lg">
            <Text size="sm" c="dimmed">
              Operating Cash Flow
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.operatingCashFlow || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card withBorder padding="lg">
            <Text size="sm" c="dimmed">
              Free Cash Flow
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.freeCashFlow || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
          <Card withBorder padding="lg">
            <Text size="sm" c="dimmed">
              Capital Expenditure
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.capitalExpenditure || 0)}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Metric</Table.Th>
              {cashFlow.slice(0, 4).map((cf) => (
                <Table.Th key={cf.date}>
                  {new Date(cf.date).getFullYear()}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { label: "Net Income", key: "netIncome" },
              {
                label: "Depreciation & Amortization",
                key: "depreciationAndAmortization",
              },
              {
                label: "Change in Working Capital",
                key: "changeInWorkingCapital",
              },
              { label: "Operating Cash Flow", key: "operatingCashFlow" },
              { label: "Capital Expenditure", key: "capitalExpenditure" },
              { label: "Acquisitions Net", key: "acquisitionsNet" },
              { label: "Investment Purchases", key: "purchasesOfInvestments" },
              {
                label: "Investment Sales",
                key: "salesMaturitiesOfInvestments",
              },
              {
                label: "Net Investing Cash Flow",
                key: "netCashUsedForInvestingActivites",
              },
              { label: "Debt Repayment", key: "debtRepayment" },
              { label: "Common Stock Issued", key: "commonStockIssued" },
              {
                label: "Common Stock Repurchased",
                key: "commonStockRepurchased",
              },
              { label: "Dividends Paid", key: "dividendsPaid" },
              {
                label: "Net Financing Cash Flow",
                key: "netCashUsedProvidedByFinancingActivities",
              },
              { label: "Free Cash Flow", key: "freeCashFlow" },
            ].map(({ label, key }) => (
              <Table.Tr key={key}>
                <Table.Td>{label}</Table.Td>
                {cashFlow.slice(0, 4).map((cf) => (
                  <Table.Td key={cf.date}>
                    {formatValue(cf[key as keyof CompanyCashFlow] as number)}
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
