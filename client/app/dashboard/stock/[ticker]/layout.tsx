import { Container, Paper, Box } from "@mantine/core";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getCompanyProfile } from "../../../../actions/stocks.action";
import StockNavigation from "../components/StockNavigation";
import StockHeader from "../components/StockHeader";

export default async function StockLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { ticker: string };
}) {
  const ticker = params.ticker;
  if (!ticker) return <div>Invalid Ticker</div>;

  const profile = (await getCompanyProfile(ticker))?.[0];

  return (
    <Box>
      <Paper radius="sm" bg="white" shadow="sm">
        <Container fluid>
          {/* Stock Info Header */}
          <StockHeader profile={profile} />
          {/* Navigation */}
          <StockNavigation ticker={ticker} />
        </Container>
      </Paper>

      {children}
    </Box>
  );
}
