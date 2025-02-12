"use client";

import { Text, Group, UnstyledButton, Stack, Box, Image } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface StockCardProps {
  symbol: string;
  name: string;
  currentPrice: number;
  percentageChange: number;
  logo: string;
}

function StockCard({
  symbol,
  name,
  currentPrice,
  percentageChange,
  logo,
}: StockCardProps) {
  const isPositive = percentageChange >= 0;

  return (
    <Box
      p="lg"
      style={{
        backgroundColor: "white",
        borderRadius: "var(--mantine-radius-md)",
        border: "1px solid var(--mantine-color-gray-2)",
      }}
    >
      <Group align="center" mb="md">
        <Image src={logo} alt={name} width={24} height={24} />
        <Text fw={500} lineClamp={1}>
          {name}
        </Text>
      </Group>

      <Group grow>
        <Stack gap={4}>
          <Text size="sm" c="dimmed">
            Current Price
          </Text>
          <Text fw={600}>${currentPrice.toFixed(2)}</Text>
        </Stack>
        <Stack gap={4}>
          <Text size="sm" c="dimmed">
            Performance
          </Text>
          <Text fw={600} c={isPositive ? "green.6" : "red.6"}>
            {isPositive ? "+" : ""}
            {percentageChange.toFixed(2)}%
          </Text>
        </Stack>
      </Group>
    </Box>
  );
}

function NavigationButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <UnstyledButton
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: "white",
        border: "1px solid var(--mantine-color-gray-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...(direction === "left" ? { left: -20 } : { right: -20 }),
        zIndex: 2,
      }}
    >
      {direction === "left" ? (
        <IconChevronLeft size={20} stroke={1.5} />
      ) : (
        <IconChevronRight size={20} stroke={1.5} />
      )}
    </UnstyledButton>
  );
}

export function StockCarousel({ stocks }: { stocks: StockCardProps[] }) {
  const SLIDES_PER_VIEW = 4;
  const GAP = 16;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const totalSlides = Math.ceil(stocks.length / SLIDES_PER_VIEW);

  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector(".stock-carousel-container");
      if (container) {
        setContainerWidth(container.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const totalGap = (SLIDES_PER_VIEW - 1) * GAP;
  const slideWidth =
    containerWidth > 0 ? (containerWidth - totalGap) / SLIDES_PER_VIEW : 0;

  return (
    <Box pos="relative" mx={20}>
      <div
        className="stock-carousel-container"
        style={{
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            transform: `translateX(-${currentIndex * containerWidth}px)`,
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              style={{
                flex: `0 0 ${slideWidth}px`,
                minWidth: slideWidth, // Fallback for older browsers
              }}
            >
              <StockCard {...stock} />
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          <NavigationButton
            direction="left"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          />
          <NavigationButton
            direction="right"
            onClick={handleNext}
            disabled={currentIndex === totalSlides - 1}
          />
        </>
      )}
    </Box>
  );
}
