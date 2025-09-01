
export async function getCountries() {
    const response = await fetch(
      "https://openholidaysapi.org/Countries?languageIsoCode=DE"
    );
    const countries = await response.json();
  
    return countries;
  }
  
  export async function getHolidays(countryCode: string) {
    const response = await fetch(
      `https://date.nager.at/api/v3/publicholidays/2025/${countryCode}`
    );
    const holidays = await response.json();
  
    return holidays;
  }
  