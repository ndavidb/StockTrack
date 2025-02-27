"use client";

import { Box, Flex, Group, Stack, Text, Title } from "@mantine/core";

import { CompanyProfile } from "../../../../types/FMPTypes";

export default function StockHeader({ profile }: { profile: CompanyProfile }) {
  return (
    <Box py="md">
      <Flex
        direction={{ base: "column", sm: "row" }}
        justify="space-between"
        gap="lg"
      >
        <Stack gap="xs">
          <Group gap="xs" wrap="nowrap">
            <Title order={2} style={{ whiteSpace: "nowrap" }}>
              {profile.symbol}
            </Title>
            <Text size="lg" c="dimmed" style={{ whiteSpace: "nowrap" }}>
              {profile.exchangeShortName}
            </Text>
          </Group>
          <Text size="sm" c="dimmed" lineClamp={2}>
            {profile.companyName}
          </Text>
        </Stack>

        <Stack gap="xs">
          <Title order={2}>${profile.price.toFixed(2)}</Title>
          <Group gap="xs" wrap="nowrap">
            <Text
              c={profile.changes > 0 ? "green.7" : "red.7"}
              fw={500}
              style={{ whiteSpace: "nowrap" }}
            >
              {profile.changes > 0 ? "+" : ""}
              {profile.changes.toFixed(2)}
            </Text>
            <Text
              c={profile.changes > 0 ? "green.7" : "red.7"}
              fw={500}
              style={{ whiteSpace: "nowrap" }}
            >
              (
              {(
                (profile.changes / (profile.price - profile.changes)) *
                100
              ).toFixed(2)}
              %)
            </Text>
          </Group>
        </Stack>
      </Flex>

      {/* Key Metrics */}
      <Flex mt="lg" gap={{ base: "xs", sm: "lg" }} wrap="wrap">
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Currency
          </Text>
          <Text fw="bold">{profile.currency}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Previous Close
          </Text>
          <Text fw="bold">${(profile.price - profile.changes).toFixed(2)}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Volume
          </Text>
          <Text fw="bold">{profile.volAvg.toLocaleString()}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Market Cap
          </Text>
          <Text fw="bold">${(profile.mktCap / 1e9).toFixed(2)}B</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Beta
          </Text>
          <Text fw="bold">{profile.beta.toFixed(2)}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Last Dividend
          </Text>
          <Text fw="bold">${profile.lastDiv.toFixed(2)}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            Discounted Cash Flow
          </Text>
          <Text fw="bold">${profile.dcf.toFixed(2)}</Text>
        </Box>
        <Box style={{ flex: "1 1 auto", minWidth: "120px" }}>
          <Text size="sm" c="dimmed">
            52W Range
          </Text>
          <Text fw="bold">${profile.range}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
