"use client";

import {
  Container,
  Group,
  Paper,
  Tabs,
  Text,
  Title,
  Flex,
  Stack,
  Box,
} from "@mantine/core";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../../../actions/stocks.action";
import { CompanyProfile } from "../../../../types/FMPTypes";

export default function StockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfile>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (params.ticker) {
        const data = await getCompanyProfile(params.ticker as string);
        if (data && data.length > 0) {
          setProfile(data[0]);
        }
      }
    };
    fetchProfile();
  }, [params.ticker]);

  const currentTab = pathname.split("/").pop() || "summary";

  const handleTabChange = (value: string) => {
    if (value === "summary") {
      router.push(`/dashboard/stock/${params.ticker}/summary`);
    } else {
      router.push(`/dashboard/stock/${params.ticker}/${value}`);
    }
  };

  if (!profile) return null;

  return (
    <Box>
      <Paper radius={0} bg="var(--mantine-color-gray-0)">
        <Container fluid>
          {/* Stock Info Header */}
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
                <Text fw="bold">
                  ${(profile.price - profile.changes).toFixed(2)}
                </Text>
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

          {/* Navigation */}
          <Box style={{ overflowX: "auto" }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="default"
              color="var(--mantine-color-primary-6)"
            >
              <Tabs.List style={{ flexWrap: "nowrap" }}>
                <Tabs.Tab value="summary">Summary</Tabs.Tab>
                <Tabs.Tab value="balance-sheet">Balance Sheet</Tabs.Tab>
                <Tabs.Tab value="income-statement">Income Statement</Tabs.Tab>
                <Tabs.Tab value="cashflow">Cash Flow</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Box>
        </Container>
      </Paper>

      {children}
    </Box>
  );
}
