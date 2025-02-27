"use client";

import { Box, Tabs } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

export default function StockNavigation({ ticker }: { ticker: string }) {
  if (!ticker) return <div>Invalid Ticker</div>;
  const pathname = usePathname();
  const router = useRouter();
  const currentTab = pathname.split("/").pop() || "summary";

  const handleTabChange = (value: string) => {
    router.push(
      `/dashboard/stock/${ticker}/${value === "summary" ? "summary" : value}`
    );
  };

  return (
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
  );
}
