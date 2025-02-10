"use server";

import {
  getCompanyDailyPrice,
  getCompanyProfile,
} from "../../../../../actions/stocks.action";
import StockSectors from "./_components/stockSectors";
import StockSummary from "./_components/stockSummary";

export default async function StockSummaryPage({
  params,
}: {
  params: { ticker: string };
}) {
  const profile = await getCompanyProfile(params.ticker);
  const daily = await getCompanyDailyPrice(params.ticker);

  if (!profile?.[0]) {
    return <div>Profile not found</div>;
  }

  if (!daily?.["Time Series (Daily)"]) {
    return <div>Daily not found</div>;
  }

  const profileData = profile[0];
  const dailyData = daily["Time Series (Daily)"];

  return (
    <>
      <StockSummary profile={profileData} daily={dailyData} />
    </>
  );
}
