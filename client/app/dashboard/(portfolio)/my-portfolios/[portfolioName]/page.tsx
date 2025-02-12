"use client";

import { Stack, Container, Title, Grid } from "@mantine/core";
import { StockCarousel } from "../components/StockCarousel";
import { PerformanceChart } from "../components/PerformanceChart";
import { StockList } from "../components/StockList";
import { getPortfolioByName } from "@/utils/portfolio";

const mockStocks = [
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    currentPrice: 207.09,
    percentageChange: 10.65,
    logo: "/stock-logos/amzn.png",
  },
  {
    symbol: "AAL",
    name: "American Airlines Group Inc.",
    currentPrice: 14.0,
    percentageChange: 22.79,
    logo: "/stock-logos/aal.png",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 176.51,
    percentageChange: 5.0,
    logo: "/stock-logos/googl.png",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 176.51,
    percentageChange: 5.0,
    logo: "/stock-logos/googl.png",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    currentPrice: 176.51,
    percentageChange: 5.0,
    logo: "/stock-logos/googl.png",
  },
];

const mockPerformanceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  value: Math.random() * 4 - 2,
}));

const mockStockList = [
  { symbol: "AMZN", logo: "/stock-logos/amzn.png", purchaseDate: "07-11-2024" },
  { symbol: "AAL", logo: "/stock-logos/aal.png", purchaseDate: "07-11-2024" },
  {
    symbol: "GOOGL",
    logo: "/stock-logos/googl.png",
    purchaseDate: "07-11-2024",
  },
  { symbol: "GOOG", logo: "/stock-logos/goog.png", purchaseDate: "07-11-2024" },
  { symbol: "GOOG", logo: "/stock-logos/goog.png", purchaseDate: "07-11-2024" },
  { symbol: "GOOG", logo: "/stock-logos/goog.png", purchaseDate: "07-11-2024" },
];

export default function PortfolioPage({
  params,
}: {
  params: { portfolioName: string };
}) {
  const portfolioName = decodeURIComponent(params.portfolioName);

  return (
    <Container fluid>
      <Title order={2} mb="xl">
        {portfolioName}
      </Title>
      <Stack>
        <StockCarousel stocks={mockStocks} />
        <Grid>
          <Grid.Col span={8}>
            <PerformanceChart
              data={mockPerformanceData}
              title="General Stocks Performance - Last 30 Days"
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <StockList stocks={mockStockList} />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
