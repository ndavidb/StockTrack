import { Container, Title } from "@mantine/core";
import { PortfolioList } from "./components/PortfolioList";
import { getPortfolios } from "@/utils/portfolio";

interface Portfolio {
  id: string;
  portfolioName: string;
  description: string;
}

export default async function PortfoliosPage() {
  const portfolios  = await getPortfolios();
  return (
    <Container fluid>
      <Title order={2} mb="lg">
        My Portfolios
      </Title>
      <PortfolioList portfolios={portfolios} />
    </Container>
  );
}
