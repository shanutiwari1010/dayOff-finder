"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getCountries, getHolidays } from "@/lib/api/countries";
import { HolidayCard } from "@/components/HolidayCard";

interface Country {
  isoCode: string;
  name: Array<{
    language: string;
    text: string;
  }>;
  officialLanguages: string[];
}


export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const { data: holidayData = [] } = useQuery({
    queryKey: ["holidays", selectedCountry?.isoCode],
    queryFn: () => getHolidays(selectedCountry!.isoCode),
    enabled: !!selectedCountry,
  });

  console.log(holidayData, "holidaydata");
  console.log(selectedCountry);

  return (
    <div className="flex flex-col items-center text-white  h-screen gap-16 py-16">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold flex flex-col items-center">
          National Holidays
          <span className="text-indigo-500">2025</span>
        </h1>
        <p className="text-md max-w-2xl text-center text-gray-400">
          Discover public holidays and observances for countries around the
          world with our comprehensive directory
        </p>
      </div>
      <div className="w-full max-w-md flex flex-col items-start gap-2">
        <Label htmlFor="email">Select Country</Label>
        <Select
          onValueChange={(value) => {
            const country = countries.find((c) => c.isoCode === value);
            setSelectedCountry(country || null);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder={
                isLoading ? "Loading countries..." : "Select a country"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.isoCode} value={country.isoCode}>
                {country.name.find((n) => n.language === "DE")?.text ||
                  country.isoCode}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-red-400 text-sm">
            Error loading countries. Please try again.
          </p>
        )}
      </div>
      {!selectedCountry && (
        <div className="flex flex-col items-center gap-2 mt-8">
          <div className="flex items-center gap-2 bg-indigo-950 p-2 rounded-full">
            <Calendar className="w-8 h-8 text-indigo-500" />
          </div>
          <h1 className="text-lg font-semibold">Select a Country</h1>
          <p className="text-sm text-gray-400 max-w-96 text-center">
            Choose a country from the dropdown above to view its national
            holidays for @2025
          </p>
        </div>
      )}

      {selectedCountry && (
        <div className="flex flex-col items-center gap-2  w-full">
          <h1 className="text-2xl font-semibold text-center">
            National Holidays for{" "}
            {selectedCountry.name.find((n) => n.language === "DE")?.text ||
              selectedCountry.isoCode}
          </h1>
          <Separator className="w-full bg-indigo-500 text-center max-w-16" />
          <span className="text-sm text-gray-400">2025</span>
          <div className="flex flex-col gap-4 w-full max-w-3xl  ">
            <HolidayCard data={holidayData} />
          </div>
        </div>
      )}
    </div>
  );
}
