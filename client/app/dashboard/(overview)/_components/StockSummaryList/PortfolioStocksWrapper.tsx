'use client';

import React, { useEffect } from "react";
import { Carousel } from '@mantine/carousel';
import { Container, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import PortfolioStockCard from './PortfolioStockCard';

interface StockPortfolio {
    id: number;
    symbol: string;
    companyName: string;
    industry: string;
    website: string;
    purchaseDate: string;
    purchasePrice: number;
}

interface Props {
    portfolioPerformance: StockPortfolioPerformance[];
}

export default function PortfolioStocksWrapper({ portfolioPerformance }: Props) {
    const { width } = useViewportSize();
    const isMobile = width < 768;

    const showControls = isMobile ? portfolioPerformance.length > 1 : portfolioPerformance.length > 4;

    const getSlideSize = () => {
        if (width < 768) return '100%';
        if (width < 992) return '33.333333%';
        return '25%';
    };

    return (
        <Container size="xl" py="md">
            <Paper shadow="sm" radius="md" p="md" withBorder>
                <Carousel
                    slideSize={getSlideSize()}
                    slideGap="md"
                    align="start"
                    withControls={showControls}
                    slidesToScroll={isMobile ? 1 : 2}
                >
                    {portfolioPerformance.map((stock) => (
                        <Carousel.Slide key={stock.symbol}>
                            <PortfolioStockCard {...stock} />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </Paper>
        </Container>
    );
}