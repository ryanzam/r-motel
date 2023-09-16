const countries = require("world-countries");

const formattedCountries = countries.map((c: any) => ({
    value: c.cca,
    label: c.name.common,
    latlng: c.latlng,
    region: c.region,
    flag: c.flag,
}));

const useLocation = () => {
    const getAllCountries = () => formattedCountries;

    const getCountryByValue = (val: string) => formattedCountries.find((c: any) => c.label === val);

    return {
        getAllCountries, getCountryByValue
    }
}

export default useLocation;