'use client';

import { Card, Text } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  title: string;
}

export function PerformanceChart({ data, title }: PerformanceChartProps) {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md">{title}</Text>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--mantine-primary-color-filled)"
              fill="var(--mantine-primary-color-filled)"
              fillOpacity={0.3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
