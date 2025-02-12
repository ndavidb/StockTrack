"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanyIncomeStatement } from "../../../../../actions/stocks.action";
import { CompanyIncomeStatement } from "../../../../../types/FMPTypes";
import {
  Card,
  Grid,
  Table,
  Title,
  Text,
  Skeleton,
  Container,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function IncomeStatementPage() {
  const { ticker } = useParams();
  const [incomeStatement, setIncomeStatement] = useState<
    CompanyIncomeStatement[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompanyIncomeStatement(ticker as string);
        if (Array.isArray(data)) {
          setIncomeStatement(data);
        }
      } catch (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch income statement data",
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

  const latestData = incomeStatement[0];

  const formatValue = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box py="sm">
      <Grid mb="sm">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Revenue
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.revenue || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Gross Profit
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.grossProfit || 0)}
            </Text>
            <Text size="xs" c="dimmed">
              Margin: {formatPercentage(latestData?.grossProfitRatio || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg" shadow="sm">
            <Text size="sm" c="dimmed">
              Operating Income
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.operatingIncome || 0)}
            </Text>
            <Text size="xs" c="dimmed">
              Margin: {formatPercentage(latestData?.operatingIncomeRatio || 0)}
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Card withBorder padding="lg">
            <Text size="sm" c="dimmed">
              Net Income
            </Text>
            <Text size="xl" fw={700}>
              {formatValue(latestData?.netIncome || 0)}
            </Text>
            <Text size="xs" c="dimmed">
              Margin: {formatPercentage(latestData?.netIncomeRatio || 0)}
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Card withBorder shadow="sm">
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Metric</Table.Th>
              {incomeStatement.slice(0, 4).map((statement) => (
                <Table.Th key={statement.date}>
                  {new Date(statement.date).getFullYear()}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {[
              { label: "Revenue", key: "revenue" },
              { label: "Cost of Revenue", key: "costOfRevenue" },
              { label: "Gross Profit", key: "grossProfit" },
              { label: "R&D Expenses", key: "researchAndDevelopmentExpenses" },
              {
                label: "SG&A Expenses",
                key: "sellingGeneralAndAdministrativeExpenses",
              },
              { label: "Operating Expenses", key: "operatingExpenses" },
              { label: "Operating Income", key: "operatingIncome" },
              { label: "Interest Income", key: "interestIncome" },
              { label: "Interest Expense", key: "interestExpense" },
              { label: "Income Before Tax", key: "incomeBeforeTax" },
              { label: "Income Tax Expense", key: "incomeTaxExpense" },
              { label: "Net Income", key: "netIncome" },
              { label: "EPS", key: "eps" },
              { label: "EPS Diluted", key: "epsdiluted" },
              { label: "EBITDA", key: "ebitda" },
            ].map(({ label, key }) => (
              <Table.Tr key={key}>
                <Table.Td fw={600}>{label}</Table.Td>
                {incomeStatement.slice(0, 4).map((statement) => (
                  <Table.Td key={statement.date}>
                    {formatValue(
                      statement[key as keyof CompanyIncomeStatement] as number
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
