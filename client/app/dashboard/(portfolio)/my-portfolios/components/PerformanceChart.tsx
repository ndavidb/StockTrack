'use client';

import { Card, Text, Group, Select } from '@mantine/core';
import { LineChart } from '@mantine/charts';
import { useState, useMemo } from 'react';

interface PerformanceData {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
}

export function PerformanceChart({ data, title }: PerformanceChartProps) {
    const [timeRange, setTimeRange] = useState("month");

    const chartData = useMemo(() => {
        const rangeMap = { week: 7, month: 30};
        return data.slice(-rangeMap[timeRange as keyof typeof rangeMap]);
    }, [data, timeRange]);

    const minValue = Math.min(...chartData.map(d => d.value));
    const maxValue = Math.max(...chartData.map(d => d.value));
    const padding = (maxValue - minValue) * 0.1;

    return (
        <Card radius="sm" withBorder p="sm" shadow="sm">
            <Group mb="lg" p="sm" justify="space-between">
                <Text size="lg" fw={500}>{title}</Text>
                <Select
                    value={timeRange}
                    onChange={(value) => setTimeRange(value as string)}
                    data={[
                        { value: "week", label: "Last Week" },
                        { value: "month", label: "Last Month" }
                    ]}
                />
            </Group>
            <LineChart
                h={400}
                data={chartData}
                dataKey="date"
                series={[
                    {
                        name: "value",
                        color: "var(--mantine-color-primary-6)",
                        valueFormatter: (value) => `$${value.toFixed(2)}`
                    },
                ]}
                tickLine="y"
                yAxisProps={{
                    domain: [Math.max(0, minValue - padding), maxValue + padding],
                }}
                valueFormatter={(value) => `$${value.toFixed(2)}`}
                tickFormatter={(date : any) => new Date(date).toLocaleDateString()}
            />
        </Card>
  );
}
