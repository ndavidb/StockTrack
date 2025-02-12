'use client';

import { Card, Text, Group, Button } from '@mantine/core';
import { IconChartLine } from '@tabler/icons-react';

interface Portfolio {
  id: string;
  portfolioName: string;
  description: string;
}

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick: () => void;
}

export function PortfolioCard({ portfolio, onClick }: PortfolioCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick} style={{ cursor: 'pointer' }}>
      <Group justify="space-between" mb="xs">
        <Text fw={500} size="lg">
          {portfolio.portfolioName}
        </Text>
        <IconChartLine size={24} style={{ color: 'var(--mantine-primary-color)' }} />
      </Group>

      <Text size="sm" c="dimmed" mb="xl">
        {portfolio.description}
      </Text>

      <Button variant="light" fullWidth>
        View Performance
      </Button>
    </Card>
  );
}
