"use client";

import {
  TextInput,
  Text,
  Group,
  Combobox,
  ComboboxDropdown,
  ComboboxOption,
  ComboboxOptions,
  ComboboxTarget,
  useCombobox,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { searchCompanies } from "../../../../../actions/stocks.action";
import { CompanySearch } from "../../../../../types/FMPTypes";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./StockSearch.module.css";

export default function StockSearch() {
  const [searchData, setSearchData] = useState<CompanySearch[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const combobox = useCombobox();

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (value.length < 1) {
      combobox.closeDropdown();
      setSearchData([]);
      return;
    }

    setLoading(true);
    combobox.openDropdown();

    try {
      const results = await searchCompanies(value);
      setSearchData(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (symbol: string) => {
    router.push(`/dashboard/stock/${symbol}/summary`);
    combobox.closeDropdown();
    setQuery("");
  };

  useEffect(() => {
    if (searchData.length > 0 && query.length > 0) {
      combobox.openDropdown();
    } else {
      combobox.closeDropdown();
    }
  }, [searchData, query]);

  const options = searchData.map((item) => (
    <ComboboxOption
      key={item.symbol}
      value={item.symbol}
      className={classes.option}
      onClick={() => handleStockSelect(item.symbol)}
    >
      <Group justify="space-between" wrap="nowrap">
        <div>
          <Text fw={500}>{item.symbol}</Text>
          <Text size="sm" c="dimmed">
            {item.name}
          </Text>
        </div>
        <Text>{item.exchangeShortName}</Text>
      </Group>
    </ComboboxOption>
  ));
  return (
    <div style={{ position: "relative", maxWidth: 400 }}>
      <Combobox
        store={combobox}
        onOptionSubmit={() => {}}
        withinPortal={false}
        shadow="md"
      >
        <ComboboxTarget>
          <TextInput
            placeholder="Search Stock"
            size="md"
            value={query}
            onChange={(event) => handleSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={18} />}
            onClick={() => combobox.openDropdown()}
            classNames={{ input: classes.input }}
          />
        </ComboboxTarget>

        <ComboboxDropdown>
          <ComboboxOptions>
            {loading ? (
              <ComboboxOption value="loading" className={classes.option}>
                <Text size="sm" c="dimmed">
                  Searching...
                </Text>
              </ComboboxOption>
            ) : options.length === 0 ? (
              <ComboboxOption value="no-results" className={classes.option}>
                <Text size="sm" c="dimmed">
                  No results found
                </Text>
              </ComboboxOption>
            ) : (
              options
            )}
          </ComboboxOptions>
        </ComboboxDropdown>
      </Combobox>
    </div>
  );
}
