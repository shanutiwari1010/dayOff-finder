import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}
interface HolidayCardProps {
  data: Holiday[];
}

export function HolidayCard({ data }: HolidayCardProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No holidays found for this country.
      </div>
    );
  }

  console.log(data[0]?.name, "1234567890");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((holiday, index) => (
        <Card key={index} className="bg-slate-800 text-white border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">{holiday?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-300">
              {new Date(holiday.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-xs text-gray-400 mt-1">Type: {holiday?.types}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
