import {getGainersAndLossers, getStocksPortfolio} from "@/actions/stocks.action";
import TopGainersAndLossers from "./_components/TopGainersAndLosers/TopGainersAndLosers";
import StockSectors from "./_components/StockSectors/stockSectors";


export default async function OverviewPage() {
    const gainersLossersData = await getGainersAndLossers();
    const portfolioData = await getStocksPortfolio();

    if (!gainersLossersData) {
        return <div>Failed to fetch gainers and losers data</div>;
    }

    return (
        <div>
            <StockSectors/>
            <TopGainersAndLossers
                metadata={gainersLossersData.metadata}
                last_updated={gainersLossersData.last_updated}
                top_gainers={gainersLossersData.top_gainers}
                top_losers={gainersLossersData.top_losers}
                most_actively_traded={gainersLossersData.most_actively_traded}
            />
        </div>
    );
}
