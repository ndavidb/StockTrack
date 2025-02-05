"use client";
import {
  Box,
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Container,
  Select,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useState, useMemo } from "react";

interface StockSummaryProps {
  profile: CompanyProfile;
  daily: AlphaVantageDailyResponse["Time Series (Daily)"];
}

export default function StockSummary({ profile, daily }: StockSummaryProps) {
  const [timeRange, setTimeRange] = useState("week");

  const chartData = useMemo(() => {
    const sortedDates = Object.keys(daily).sort().reverse();
    const rangeMap = { week: 7, month: 30, "100days": 100 };
    const dataPoints = sortedDates
      .slice(0, rangeMap[timeRange as keyof typeof rangeMap])
      .reverse();

    return dataPoints.map((date) => ({
      date,
      price: parseFloat(daily[date]["4. close"]),
    }));
  }, [daily, timeRange]);

  return (
    <Container fluid py="sm" px={0}>
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper radius="sm" withBorder p="sm">
            <Group mb="md">
              <Title order={4}>Stock Price Chart</Title>
              <Select
                value={timeRange}
                onChange={(value) => setTimeRange(value as string)}
                data={[
                  { value: "week", label: "Last Week" },
                  { value: "month", label: "Last Month" },
                  { value: "100days", label: "Last 100 Days" },
                ]}
              />
            </Group>
            <LineChart
              h={400}
              data={chartData}
              dataKey="date"
              series={[
                { name: "price", color: "var(--mantine-color-primary-5)" },
              ]}
              tickLine="y"
              yAxisProps={{
                domain: [chartData[0].price * 0.6, chartData[0].price * 1.2],
              }}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper radius="sm" withBorder p="sm">
            <Title order={4} mb="md">
              About the company
            </Title>
            <Text size="sm" c="dimmed">
              {profile.description.slice(0, 1200)}.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
